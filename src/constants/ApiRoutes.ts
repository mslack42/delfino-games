export const ApiRoutes = {
  AddGame: "/api/add-game",
  SearchNewGame: (searchTerm: string) =>
    `/api/games/searchNew?name=${searchTerm}`,
  SearchSuggestion: (searchTerm: string) =>
    `/api/games/searchSuggestion?name=${searchTerm}`,
  EditPerson: "/api/people",
  DeletePerson: (holderId: number) => `/api/people?id=${holderId}`,
  ChangePassword: "/api/profile/changePassword",
  EditProfile: "/api/profile",
  DeleteProfile: "/api/profile",
  Register: "/api/register",
  DeleteUser: (userId: string) => `/api/user?id=${userId}`,
  ResetUserPassword: (userId: string) => `/api/user/passwordReset?id=${userId}`,
  VerifyUser: (userId: string) => `/api/user/verify?id=${userId}`,
  EditUser: "/api/user",
  SignIn: "/api/auth/signin",
  ChangeRotationStatus: "/api/game/changeRotationStatus",
  DeleteGame: (gameId: string) => `/api/game?id=${gameId}`,
  EditGame: (gameId: string) => `/api/game?id=${gameId}`,
  ToggleGameRequest: "/api/request",
  ClearGameRequests: "/api/request/clearAll",
  ToggleGameSuggestion: "/api/suggest",
};
