import React from 'react'
import UserListCreate from '../user/UserListCreate'
import PaymentListCreate from '../payment/PaymentListCreate'

function Home({currentUser, showAdminContent, showStandardContent}) {
  return (
    <>
      {showStandardContent && (
        <PaymentListCreate  currentUser={currentUser} />
      )}
      {showAdminContent && (
        <UserListCreate currentUser={currentUser} />
      )}
    </>
  )
}

export default Home