// 组合redux子模块 + 导出store实例

import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/modules/user";
import channelReducer from "@/store/modules/channel";

export default configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer
  }
})

