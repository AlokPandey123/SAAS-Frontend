import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const USERS_KEY = 'solara_users'
const BOOKINGS_KEY = 'solara_bookings'
const CURRENT_USER_KEY = 'solara_current_user'

const loadJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const saveJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadJson(CURRENT_USER_KEY, null))
  const [users, setUsers] = useState(() => loadJson(USERS_KEY, []))
  const [bookings, setBookings] = useState(() => loadJson(BOOKINGS_KEY, []))

  useEffect(() => {
    saveJson(CURRENT_USER_KEY, user)
  }, [user])

  useEffect(() => {
    saveJson(USERS_KEY, users)
  }, [users])

  useEffect(() => {
    saveJson(BOOKINGS_KEY, bookings)
  }, [bookings])

  const register = ({ name, mobile, password }) => {
    const normalized = mobile.trim()
    if (users.some((item) => item.mobile === normalized)) {
      return { success: false, message: 'Mobile number is already registered.' }
    }

    const newUser = { id: crypto.randomUUID(), name, mobile: normalized, password }
    const nextUsers = [...users, newUser]
    setUsers(nextUsers)
    setUser({ id: newUser.id, name: newUser.name, mobile: newUser.mobile })
    return { success: true }
  }

  const login = ({ mobile, password }) => {
    const normalized = mobile.trim()
    const found = users.find((item) => item.mobile === normalized && item.password === password)
    if (!found) {
      return { success: false, message: 'Invalid credentials.' }
    }
    setUser({ id: found.id, name: found.name, mobile: found.mobile })
    return { success: true }
  }

  const logout = () => setUser(null)

  const saveBooking = (booking) => {
    if (!user) return { success: false, message: 'Login required.' }
    const newBooking = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      userMobile: user.mobile,
      createdAt: new Date().toISOString(),
      ...booking,
    }
    setBookings((current) => [newBooking, ...current])
    return { success: true }
  }

  const userBookings = useMemo(
    () => bookings.filter((booking) => user && booking.userId === user.id),
    [bookings, user]
  )

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, saveBooking, userBookings, bookings }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
