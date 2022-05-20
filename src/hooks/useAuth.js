import React, { useState, useEffect } from "react";
import { Role_hierarchy , ROLE_MASTER, ROLE_SUPER_ADMIN} from "redux/constants/Auth";
import { useSelector } from "react-redux";

const useAuth = (props) => {
  const UserRole = useSelector((state) => state.auth.role);
  const [AuthNeeded] = props;
  var authentication = false;

  if (Array.isArray(AuthNeeded)) {
    AuthNeeded.forEach(authNeeded => {
      if (authNeeded === UserRole) {
        authentication = true ;
      }
    })

  }else{
    authentication = Role_hierarchy.indexOf(UserRole) >= Role_hierarchy.indexOf(AuthNeeded) ;
  }

  return {
    userRole: UserRole,
    isAuth: authentication,
    exact: UserRole === AuthNeeded,
    adminstration : Role_hierarchy.indexOf(UserRole) >= Role_hierarchy.indexOf(ROLE_MASTER) ?  true : false ,
  };
};


export default useAuth;
