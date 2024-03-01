export const ApiRoutes = {
  AddGame: "/api/add-game",
  SearchNewGame: (searchTerm: string) =>
    `/api/games/searchNew?name=${searchTerm}`,
  EditPerson: "/api/people",
  DeletePerson: (holderId: number) => `/api/people?id=${holderId}`,
  ChangePassword: "/api/profile/changePassword",
  EditProfile: "/api/profile",
  Register: "/api/register",
  DeleteUser: (userId: string) => `/api/user?id=${userId}`,
  ResetUserPassword: (userId:string) => `/api/user/passwordReset?id=${userId}`,
  VerifyUser: (userId:string) => `/api/user/verify?id=${userId}`,
  EditUser: "/api/user",
  SignIn:"/api/auth/signin"
};

export const ApplicationRoutes = {
  Games: "/games",
  AddGame: (bggId: number) => `/add-game/${bggId}`,
  People: "/people",
  PersonsGames: (name: string) => `/games/holder/${name}`,
  EditPerson: (id: number) => `/people/${id}`,
  Register: "/register",
  EditProfile: "/profile/edit",
  Game: (id:number) => `/games/game/${id}`,
  Home: "/",
  LogIn: "/login",
  Profile: "/profile",
  ChangePassword: "/profile/changePassword",
  FindAndAddGame: "/add-game",
  Users: "/users"
};
