import { StickyHeadTable } from "../component";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/service";
export default function AllUser() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const allDynamicUsers =[
      {
        name:'Mohsin',
        email:'mohsinali481997@gmail.com',
        password:'123456',
        role:'Admin'
      },
      {
        name:'Ahsan',
        email:'ahsan@gmail.com',
        password:'123456',
        role:'User'
      },
      {
        name:'Kamran',
        email:'Kamran@gmail.com',
        password:'123456',
        role:'User'
      },      {
        name:'Farzan',
        email:'Farzan@gmail.com',
        password:'123456',
        role:'SUPERADMIN_ROLE'
      },
      {
        name:'Bilal',
        email:'Bilal@gmail.com',
        password:'123456',
        role:'Admin'
      },      {
        name:'Zahid',
        email:'Zahid@gmail.com',
        password:'123456',
        role:'User'
      }
    ]
    const allUser = await getRequest("/getAllUsers") 
  console.log('allUsers',allUser);
    if (allUser && allUser.user && allUser.user.length > 0) {
  console.log('allUsers');
      setAllUsers(allUser.user);
      
      
    }
  // let users=[]
  // for(let i=0 ; i<=100;i++){
  //   users.push({_id:Math.random()*1000 ,...allDynamicUsers})
  // }
    // setAllUsers(allDynamicUsers);
    // console.log(data);
  };
  console.log(allUsers);

  return (
    <>
      <StickyHeadTable data={allUsers}/>
    </>
  );
}
