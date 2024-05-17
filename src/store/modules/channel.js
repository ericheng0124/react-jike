// 频道列表相关的状态管理

import {createSlice} from "@reduxjs/toolkit";
import {getChannelAPI} from "@/apis/article";

const channelStore = createSlice({
  name: 'channel',
  initialState: {
    channelList: []
  },
  reducers: {
    setChannelList(state, action) {
      state.channelList = action.payload
    }
  }
})

const {setChannelList} = channelStore.actions

const channelReducer = channelStore.reducer

const fetchChannelList = () => {
  return async (dispatch) => {
    const res = await getChannelAPI()
    dispatch(setChannelList(res.data.channels))
  }
}

export {fetchChannelList, setChannelList}

export default channelReducer