import { ADD_ROOM, GET_ROOMS, UPDATE_ROOM_DETAILS, REMOVE_ROOM, ADD_PHOTO } from '../actions/rooms.action';
import { ADD_FURNITURE, DELETE_FURNITURE, UPDATE_FURNITURE} from '../../furniture/actions/furniture.action';
import _ from 'lodash';

const roomsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ADD_PHOTO:
      newState = _.clone(state);
      newState[action.selectedRoom].photoURL = action.url;
      return newState;

    //handles initial pull from db
    case GET_ROOMS:
      let rooms = action.payload.val();
      return Object.assign(_.cloneDeep(state), rooms);

    case ADD_ROOM:
      if (!action.roomName) {
        return state;
      }
      newState = _.cloneDeep(state);
      newState[action.roomName] = action.contents;
      return newState;

    case UPDATE_ROOM_DETAILS:
      // Return state with no changes if action doesn't have contents, or if it doesn't have a correct oldRoomName
      if (!state[action.oldRoomName] || !action.contents) {
        return state;
      }

      newState = _.cloneDeep(state);
      newState[action.oldRoomName] = action.contents;

      // Rename the room object if there is a new room
      if (action.newRoomName && action.newRoomName !== action.oldRoomName) {
        newState[action.newRoomName] = newState[action.oldRoomName];
        delete newState[action.oldRoomName];
      }

      return newState;
    case ADD_FURNITURE:
      if (!action.roomName) {
        return state;
      }
      //clone state
      newState = _.clone(state);
      //check to see if storage loaction is an obj or placeholder text
      if (typeof(newState[action.roomName].furniture) !== 'object') {

        newState[action.roomName].furniture = {};
      }

      //add in new furniture properties at the roomName.furnitureName location
      newState[action.roomName].furniture[action.furnitureName] = action.furnitureProps;
      return newState;
    case DELETE_FURNITURE:
      newState = _.clone(state);
      delete newState[action.roomName].furniture[action.furnitureName];
      return newState;
    case UPDATE_FURNITURE:
      newState = _.clone(state);
      Object.assign(newState[action.roomName].furniture[action.furnitureName],
        action.newProps);
      return newState;
    case REMOVE_ROOM:
      newState = _.clone(state);
      delete newState[action.title]
      return newState;
    default:
      return state;
  }
};

export default roomsReducer;
