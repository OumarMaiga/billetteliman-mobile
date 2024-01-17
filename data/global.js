/* CUSTOM STRUCTURES */
export const LOG = {
    OFF: 0,
    INFO: 1,
    DEBUG: 2,
    TRACE: 3,
    ROOT: 4
};
export const SERVER_STATUS_CODE = {
    OK: { 'code': 200, 'text': 'Server reported "Ok"' },
    CREATED: { 'code': 201, 'text': 'Server reported "Created"' },
    NO_CONTENT: { 'code': 204, 'text': 'Server reported "No Content"' },
    BAD_REQUEST: { 'code': 400, 'text': 'Server reported "Bad Request"' },
    UNAUTHORIZED: { 'code': 401, 'text': 'Server reported "Unauthorized"' },
    FORBIDDEN: { 'code': 403, 'text': 'Server reported "Forbidden"' },
    NOT_FOUND: { 'code': 404, 'text': 'Server not available' },
    NOT_ALLOWED: { 'code': 405, 'text': 'Server reported "Not Allowed"' },
    NOT_ACCEPTABLE: { 'code': 406, 'text': 'Server reported "Not Acceptable"' },
    CONFLICT: { 'code': 409, 'text': 'Server reported "Conflict"' },
    SERVER_ERROR: { 'code': 500, 'text': 'Internal Server Error' },
    MAINTENANCE: { 'code': 503, 'text': 'Server is down for Maintenance' },
    UNKNOWN: { 'code': 600, 'text': 'Server reported Unknown' }
};
/* GLOBAL VARIABLES */
/* general */
global.appName = 'Billet Teliman';
global.debug = LOG.TRACE;
global.users = [];
global.user = null;
global.currentUser = {
    'id': null,
    'username': null,
    'first_name': null,
    'last_name': null,
    'email': null,
    'phone': null,
    'state': null,
    'category': null,
    'token': null,
    'gender': null
};

/* backend */
/* Wi-fi */
//global.SERVER_ADDRESS = 'http://billetteliman.local';

/* ngrok */
global.SERVER_ADDRESS = 'https://fbd6-2c0f-f900-1002-acb-a852-9817-639c-ef94.ngrok-free.app';

global.server_off = false;
global.server_status = null;
global.server_data = null;
global.accessToken = null;

// colors //
global.Yellow = "#ECBB04";
global.darkYellow = "#FAB52B";
global.blue = "#89bbde";
global.darkBlue = "#0087C8";
global.lightGray = "#CFCFCF";
global.gray = "#AAAAAA";
global.darkGray = "#4D4D4D";
global.white = "#FFF";
global.black = "#000";
global.blackLight = "#242424";

// storage //
export const STORAGE_KEY_ACCESS_TOKEN = '@access_token';