import React, { useEffect, useState } from "react"
import HomePage from "./Home"
import MovieDetails from "./MovieDetails"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "../../components/footer"
import { signUpUser, signInUser } from "../../repository/userRepository"
import type { SigninType, SignupType } from "../../utils/type"

function Home() {
  const [search, setSearch] = useState(false)
  const [state, setState] = useState(0)
  const [register, setRegister] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [authErr, setAuthErr] = useState(
    { signin: "", signup: "" }
  )
  const [signup, setSignup] = useState<SignupType>({
    nickname: "",
    nicknameValid: null,
    email: "",
    emailValid: null,
    password: "",
    passwordValid: null,
    confirm_password: ""
  })
  const [signin, setSignin] = useState<SigninType>({
    email: "",
    emailValid: null,
    password: "",
    passwordValid: null
  })
  useEffect(() => {
    document.title = "StreamBox"
  }, [])

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setRegister(true)
    if (!signup.nickname) {
      setSignup(prev => ({ ...prev, nicknameValid: false }))
      setRegister(false)
    }
    else if (!signup.email || !signup.email.includes("@")) {
      setSignup(prev => ({ ...prev, emailValid: false }))
      setRegister(false)
      return
    }
    else if (!signup.password) {
      setSignup(prev => ({ ...prev, passwordValid: false }))
      setRegister(false)
      return
    }
    else if (signup.password != signup.confirm_password) {
      setSignup(prev => ({ ...prev, passwordValid: false }))
      setRegister(false)
      return
    }
    const user = await signUpUser({
      email: signup.email,
      nickname: signup.nickname,
      password: signup.password
    })
    setRegister(false)
    if (user.success === false) {
      setAuthErr(prev => ({ ...prev, signup: user.message }))
      setTimeout(() => {
        setAuthErr(prev => ({ ...prev, signin: "" }))
      }, 1000)
    }
  }

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setSubmit(true)
    if (!signin.email || !signin.email.includes("@") || !signin.email.includes("@")) {
      e.preventDefault()
      setSignin(prev => ({ ...prev, emailValid: false }))
      setSubmit(false)
      return
    } else if (!signin.password) {
      e.preventDefault()
      setSignin(prev => ({ ...prev, passwordValid: false }))
      setSubmit(false)
      return
    }
    const user = await signInUser({ email: signin.email, password: signin.password })
    setSubmit(false)
    if (user.success === false) {
      setAuthErr(prev => ({ ...prev, signin: user.message }))
      setTimeout(() => {
        setAuthErr(prev => ({ ...prev, signin: "" }))
      }, 1000)
    }
    console.log(user)
  }

  return (
    <>
      <BrowserRouter>
        <div className="relative min-h-screen mb-[0.5px] pb-5 font-montserat overflow-x-hidden w-screen bg-neutral items-center z-0 flex flex-col">
          <header className="flex fixed w-full top-0 bg-[rgba(0,0,0,0.5)] z-1000 justify-between items-center h-17.5 px-25">
            <img src="/assets/images/StreamBox.svg" alt="StreamBox Logo" />
            <nav className="flex list-none items-center gap-x-10">
              <li className="cursor-pointer">
                <a href="/" className="text-text-color font-montserat">Home</a>
              </li>
              <li className="cursor-pointer">
                <a href="" className="text-text-color font-montserat">Discover</a>
              </li>
              <li className="cursor-pointer">
                <button onClick={() => setState(2)} className="text-text-color font-montserat">Signin</button>
              </li>
              <li className={`${search ? 'opacity-100' : 'opacity-0 cursor-default'} relative w-49`}>
                <img src="/assets/icons/search.svg" className="absolute top-2 right-1.5" width={12} height={12} alt="" />
                <input placeholder="Search..." className="border rounded-xl text-white placeholder:text-xs px-1 text-sm w-full border-text-color font-montserat" type="text" name="" id="search" />
              </li>
              <li className="cursor-pointer">
                <img src="/assets/icons/search.svg" className="w-5 h-5" alt="" onClick={() => setSearch(!search)} />
              </li>
              <li>
                <button onClick={() => setState(1)} className="text-text-color font-montserat">SignUp</button>
              </li>
            </nav>
          </header>
          <img src="/assets/images/hero-section.png" className="max-w-full absolute z-5 top-0 left-0 brightness-25" alt="" />
          {
            state == 1 && (
              <div className="absolute flex items-center justify-center w-screen h-screen top-0 left-0 z-900000 bg-[rgba(0,0,0,0.7)]">
                <section className="w-100 bg-text-color rounded-lg">
                  <header className="px-5 border-b py-2 border-neutral flex justify-between items-center">
                    <h2 className="text-neutral text-sm font-bold">Sign Up</h2>
                    <div onClick={() => setState(0)} className="flex relative w-5 h-5">
                      <span className="absolute w-0.5 h-4.5 bg-neutral rotate-45"></span>
                      <span className="absolute w-0.5 h-4.5 bg-neutral -rotate-45"></span>
                    </div>
                  </header>
                  <main className="px-5 text-neutral border-b py-2 text-xs font-inter border-neutral">
                    <form className="flex relative flex-col gap-y-2.5" action="">
                      {
                        authErr.signup && (
                          <aside className="absolute w-full m-auto h-full bg-white z-9000000">
                            <div className="flex flex-col justify-center gap-y-4 items-center h-full">
                              <div className="relative h-20 w-20 flex justify-center items-center bg-orange-500 rounded-full">
                                <span className="absolute h-[70%] rounded-3xl bg-white w-4 rotate-45"></span>
                                <span className="absolute h-[70%] rounded-3xl bg-white w-4 -rotate-45"></span>
                              </div>
                              <p>{authErr.signup}</p>
                            </div>
                          </aside>
                        )
                      }
                      <label htmlFor="nickname">
                        <p className={`${signup.nicknameValid === false && "text-red-400"}`}>Nickname</p>
                        <input disabled={register} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSignup(prev => ({ ...prev, nicknameValid: null, nickname: e.target.value }))
                        }} className={`${signup.nicknameValid === false && "border-red-300"} border border-primary  px-1 rounded-sm w-full h-7 text-sm bg-white outline-0`} type="text" placeholder="haywhy" id="nickname" />
                      </label>
                      <label htmlFor="email">
                        <p className={` ${signup.emailValid === false && "text-red-400"}`}>Email</p>
                        <input disabled={register} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSignup(prev => ({ ...prev, emailValid: null, email: e.target.value }))
                        }} className={`px-1 ${signup.emailValid === false && "border-red-300"} border-primary border rounded-sm w-full h-7 text-sm bg-white outline-0`} type="email" placeholder="johndoe@example.com" id="email" />
                      </label>
                      <label htmlFor="password">
                        <p className={`${signup.passwordValid === false && "text-red-400"}`}>Password</p>
                        <input disabled={register} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSignup(prev => ({ ...prev, passwordValid: null, password: e.target.value }))
                        }} className={`px-1 ${signup.passwordValid === false && "border-red-300"} border border-primary rounded-sm w-full h-7 text-sm bg-white outline-0`} type="password" placeholder="" id="password" />
                      </label>
                      <label htmlFor="cpassword">
                        <p className={`${signup.passwordValid === false && "text-red-400"}`}>Confirm Password</p>
                        <input disabled={register} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSignup(prev => ({ ...prev, passwordValid: null, confirm_password: e.target.value }))
                        }} className={`px-1 ${signup.passwordValid === false && "border-red-300"} border border-primary rounded-sm w-full h-7 text-sm bg-white outline-0`} type="password" placeholder="" id="cpassword" />
                        {signup.passwordValid === false && <p className="text-red-400">password mismatch or password length less than 8</p>}
                      </label>
                      <p className="">Already have an account? <span onClick={() => setState(2)} className="text-primary underline cursor-pointer">signin</span></p>
                      {
                        !register ? (
                          <button onClick={handleSignup} className="cursor-pointer rounded-lg hover:bg-primary transition-all duration-700 bg-neutral py-2.5 text-sm text-text-color">Sign up</button>
                        ) : (
                          <button type="button" disabled className="flex cursor-not-allowed rounded-lg bg-primary py-2.5 text-sm text-text-color">
                            <span className="animate-spin w-4 mx-auto h-4 border-2 border-text-color border-t-white rounded-full"></span>
                          </button>
                        )
                      }
                    </form>
                  </main>
                </section>
              </div>
            )
          }
          {
            state == 2 && (
              <div className="absolute flex items-center justify-center w-screen h-screen top-0 left-0 z-900000 bg-[rgba(0,0,0,0.7)]">
                <section className="w-100 bg-text-color rounded-lg">
                  <header className="px-5 border-b py-2 border-neutral flex justify-between items-center">
                    <h2 className="text-neutral text-sm font-bold">Sign in</h2>
                    <div onClick={() => setState(0)} className="flex relative w-5 h-5">
                      <span className="absolute w-0.5 h-4.5 bg-neutral rotate-45"></span>
                      <span className="absolute w-0.5 h-4.5 bg-neutral -rotate-45"></span>
                    </div>
                  </header>
                  <main className="px-5 text-neutral border-b py-2 text-xs font-inter border-neutral">
                    <form className="flex relative flex-col gap-y-2.5" action="">
                      {
                        authErr.signin && (
                          <aside className="absolute w-full m-auto h-full bg-white z-9000000">
                            <div className="flex flex-col justify-center gap-y-4 items-center h-full">
                              <div className="relative h-20 w-20 flex justify-center items-center bg-orange-500 rounded-full">
                                <span className="absolute h-[70%] rounded-3xl bg-white w-4 rotate-45"></span>
                                <span className="absolute h-[70%] rounded-3xl bg-white w-4 -rotate-45"></span>
                              </div>
                              <p>{authErr.signin}</p>
                            </div>
                          </aside>
                        )
                      }
                      <label htmlFor="email">
                        <p className={`${signin.emailValid === false && "text-red-400"}`}>Email</p>
                        <input onClick={() => setSignin(prev => ({ ...prev, emailValid: null }))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSignin(prev => ({ ...prev, email: e.target.value }))
                        }} className={`${signin.emailValid === false && "border-red-400"} border border-primary px-1 rounded-sm w-full h-7 text-sm bg-white outline-0`} type="email" placeholder="johndoe@example.com" id="email" />
                      </label>
                      <label htmlFor="password">
                        <p className={`${signin.passwordValid === false && "text-red-400"}`}>Password</p>
                        <input onClick={() => setSignin(prev => ({ ...prev, passwordValid: null }))} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSignin(prev => ({ ...prev, password: e.target.value }))
                        }} className={`${signin.passwordValid === false && "border-red-400"} border border-primary px-1 rounded-sm w-full h-7 text-sm bg-white outline-0`} type="password" placeholder="" id="password" />
                      </label>
                      <p className="">Don't have an account? <span onClick={() => setState(1)} className="text-primary underline cursor-pointer">signup</span></p>
                      {
                        !submit ? (
                          <button onClick={handleSignin} className="cursor-pointer rounded-lg hover:bg-primary transition-all duration-700 bg-neutral py-2.5 text-sm text-text-color">Sign in</button>
                        ) : (
                          <button type="button" disabled className="flex cursor-not-allowed rounded-lg bg-primary py-2.5 text-sm text-text-color">
                            <span className="animate-spin w-4 mx-auto h-4 border-2 border-text-color border-t-white rounded-full"></span>
                          </button>
                        )
                      }
                    </form>
                  </main>
                </section>
              </div>
            )
          }
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default Home
