import React from 'react'
import UserListCreate from '../user/UserListCreate'
import InsuranceListCreate from '../insurance/InsuranceListCreate'

function Home({currentUser, showAdminContent, showStandardContent}) {
  return (
    <>
      {showStandardContent && (
        <InsuranceListCreate currentUser={currentUser} />
      )}
      {showAdminContent && (
        <UserListCreate currentUser={currentUser} />
      )}
    </>
  )
}

export default Home