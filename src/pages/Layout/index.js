import React, {useEffect} from 'react';
import {request} from "@/utils";

// 测试token是否注入成功





const Layout = () => {
  useEffect(()=>{
    request.get('/user/profile')
  },[])

  return (
    <div>
      this is Layout...
    </div>
  );
};

export default Layout;