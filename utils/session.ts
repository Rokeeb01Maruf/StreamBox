export const storeCurrentUser = (id: string) => {
    localStorage.setItem("streambox_current_user", id)
}

export const getCurrentUser = () => {
   const currentUser = localStorage.getItem("streambox_current_user")
   return currentUser
}