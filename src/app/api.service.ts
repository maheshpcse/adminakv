import { environment } from '../environments/environment';

export class ApiService {
  public static timer = 30000;
  public static API = {
    // DATA APT URL's
    GET_DB_CONNECTION: environment.apiUrl + '/dbconnection',
    GET_API_WORK: environment.apiUrl + '/server',

    // DOWNLOAD A FILE
    ADD_DATA_TO_DOWNLOAD: environment.apiUrl + '/download',

    // LOGIN and SIGNUP API URL's
    LOGIN: environment.apiUrl + '/login',
    SIGNUP: environment.apiUrl + '/signup',
    VALID_LOGIN: environment.apiUrl + '/validlogin',
    VALIDATE_USER: environment.apiUrl + '/validateuser',
    FORGOT_PASSWORD: environment.apiUrl + '/forgotpassword',
    USER_LOGOUT: environment.apiUrl + '/logout',
    
    // USERS API URLS's
    GET_USERS_LIST: environment.apiUrl + '/getUsers',
    GET_USER_PROFILE: environment.apiUrl + '/getuserprofile',
    GET_USERS_PROFILES: environment.apiUrl + '/getusersprofiles',
    UPLOAD_SINGLE_IMAGE: environment.apiUrl + '/uploadsingle',
    UPLOAD_MULTIPLE_IMAGES: environment.apiUrl + '/uploadmultiple',
    CHANGE_PASSWORD: environment.apiUrl + '/changepassword',
    CHANGE_USERNAME: environment.apiUrl + '/changeusername',
    SEND_MESSAGE: environment.apiUrl + '/sendmessage',
    UPDATE_USER_STATUS: environment.apiUrl + '/updateuserstatus',

    // NOTIFICATIONS API URL's
    GET_NOTIFICATIONS_COUNT: environment.apiUrl + '/getNotifications',

    // CONFIGURATION API URL's
    GET_MODULE_CONFIGURATIONS: environment.apiUrl + '/getConfigurations',
    UPDATE_MODULE_CONFIGURATIONS: environment.apiUrl + '/updateConfigurations',

    // PROJECT API URL's
    GET_PROJECT_LIST: environment.apiUrl + '/getProjects',
    ADD_PROJECT: environment.apiUrl + '/addProject',

    // INBOX API URL's
    SEND_NEW_MESSAGE: environment.apiUrl + '/sendMessage',
    REVEIVE_MESSAGES: environment.apiUrl + '/receiveMessages'
  }
}