import * as xml2js from 'xml2js'
import { BggSearchResult } from './types'

export const searchGames = async (name:string) => {
    const bggData = await fetch(`https://boardgamegeek.com/xmlapi/search?type=boardgame&search=${name}`)
    const bggXml = await bggData.text()
    let bggJson: any
    xml2js.parseString(bggXml,(err,res) => {
        if(err) {
            return []
        }
        bggJson = res
    })
    const data = await parseBggDataIntoList(bggJson)

    return data
}

const parseBggDataIntoList = async (bggData: any) => {
    const searchResults = bggData?.boardgames?.boardgame
    if (!searchResults) {
        return []
    }
    let bggIds: string[] = []
    for ( var item of searchResults) {
        const bggId = item?.$?.objectid
        if (bggId) {
            bggIds.push(bggId)
        }
    }
    const bggSuggestions = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${bggIds.join(',')}&stats=1`)
    const bggSuggestionsXml = await bggSuggestions.text()
    let bggJson: any
    xml2js.parseString(bggSuggestionsXml, (err,res) => {
        if(err) {
            return []
        }
        bggJson = res
    })
    const searchResultsData = bggJson?.items?.item
    if (!searchResultsData) {
        return []
    }
    return await parseBggDetailsIntoList(searchResultsData)
}

const parseBggDetailsIntoList = async (bggData: any[]) => {
    let output: BggSearchResult[] = []
    for (var item of bggData){
        if (item?.$?.type === "boardgame") {
            const res = {
                bggId: item?.$?.id,
                thumb: (item?.thumbnail && item?.thumbnail.length) ? item?.thumbnail[0]: undefined,
                image: (item?.image && item?.image.length) ? item?.image[0]: undefined,
                name: item?.name?.filter(n => n.$.type === "primary")[0].$.value,
                description: (item?.description && item?.description.length) ? item?.description[0]: undefined,
                minPlayers: item?.minplayers[0].$.value,
                maxPlayers: item?.maxplayers[0].$.value,
                minPlaytime: item?.minplaytime[0].$.value,
                maxPlaytime: item?.maxplaytime[0].$.value,
                bggScore: item?.statistics[0].ratings[0].average[0].$.value,
                bggRank:  item?.statistics[0].ratings[0].ranks[0].rank.filter(r => r.$.name === "boardgame")[0].$.value,
                tags: item?.link.filter(l => ['boardgamecategory','boardgamemechanic'].includes(l.$.type)).map(l => l.$.value)
            }

            const data: BggSearchResult = {
                name: res.name,
                bggId: tryParseInt(res.bggId)!,
                thumb: res.thumb,
                image: res.image,
                description: res.description,
                boardGameDataSpecs: {
                    rank: tryParseInt(res.bggRank),
                    score: tryParseFloat(res.bggScore)
                },
                boardGameBggDataStats: {
                    minplayers: tryParseInt(res.minPlayers),
                    maxplayers: tryParseInt(res.maxPlayers),
                    minplaytime_minutes: tryParseInt(res.minPlaytime),
                    maxplaytime_minutes: tryParseInt(res.maxPlaytime),
                    tags: res.tags
                }
            }
            output.push(data)
        }
    }
    return output
}

const tryParseInt = (s:string): number|undefined => {
    try {
        return Number.parseInt(s)
    }
     catch (e) {
        return undefined
     }
}

const tryParseFloat = (s:string): number|undefined => {
    try {
        return Number.parseFloat(s)
    }
     catch (e) {
        return undefined
     }
}