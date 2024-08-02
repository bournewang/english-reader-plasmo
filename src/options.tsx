import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import Plans from './components/Plans';
// import SubscriptionManagement from './components/Subscription';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import History from './components/History';
import WordHistory from './components/WordHistory';
import Faq from './components/Faq';
import Settings from './components/Settings';
import ReadingResources from './components/Resources';
import { UserProvider, useUser } from './contexts/UserContext';
import { LocaleProvider, useLocale } from './contexts/LocaleContext';
import './styles/tailwind.css'; // Ensure Tailwind CSS is imported
import { logoutUser } from './api/user';
import { getQueryParams } from './api/helper';
import siteLogo from "./assets/logo.png"

function OptionsPage() {
  const [path, setPath] = useState<string>('/home');
  const { user, logout } = useUser();
  const [menuMode, setMenuMode] = useState("headerMode"); // set to headerMode or not
  // define a list of path DONOT need login
  const publicPathList = [
    'faq',
    'settings',
    'reading-resources',
  ];
  // init path in effect
  useEffect(() => {
    const params = getQueryParams();
    console.log(params);
    if (params.page) {
      console.log("set path: ", params.page)
      setPath(params.page)
    }
  }, [])

  const toggle = (newPath: string) => {
    console.log('toggle');
    setPath(newPath);
  };

  const handleLogout = async () => {
    logoutUser();
    logout();
    window.location.reload();
  };

  return (
    <>
      {/* set the layout take 100% of width and height, donot scroll */}
      <div className="min-h-screen flex flex-col bg-gray-100 w-full h-full">
        {/* <Header user.email={user.email} /> */}
        <header className="bg-gray-800 py-1 px-6 flex items-center justify-between">
          <div className="space-x-2 flex items-center justify-between">
            <img src={siteLogo} className="w-16 h-16" alt="" />
            <h1 className="text-white text-lg font-semibold">English Reader</h1>
          </div>

          {menuMode == 'headerMode' && (
            <nav className="space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("home")} >         Dashboard</a>
              <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("history")}>       Articles</a>
              <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("word-history")} > Vocabulary</a>

              <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("reading-resources")} > Reading Resources</a>
              <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("faq")} > FAQ</a>
              <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("settings")} > Settings</a>

              {/* <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("/plan")} > Plans</a>
              <a href="#" className="text-gray-400 hover:text-gray-200" onClick={() => toggle("/subscription")} > Subscription</a> */}
            </nav>
          )}
          {user && (
            <nav className="space-x-2">
              <a className="text-white ">{user.email}</a>
              <button className="text-white ml-4" onClick={handleLogout}>Logout</button>
            </nav>
          )}
        </header>

        {/* show login if user not login and accessing path not in publicPathList */}
        {((!user || !user.id) && !publicPathList.includes(path)) ? (
          <div className="flex-1 flex items-center justify-center">
            <Login />
          </div>
        ) : (
          <div className="flex-1 flex">
            {menuMode != "headerMode" && (
              <nav className="bg-blue-600 w-1/8 p-4">
                {/* <h1 className="text-white text-2xl mb-4">My App</h1> */}
                <ul className="space-y-2">
                  <li><button onClick={() => toggle("home")} className="text-white hover:text-gray-300 w-full text-left">Dashboard</button></li>
                  <li><button onClick={() => toggle("history")} className="text-white hover:text-gray-300 w-full text-left">Article History</button></li>
                  <li><button onClick={() => toggle("word-history")} className="text-white hover:text-gray-300 w-full text-left">Vocabulary</button></li>
                  {/* <li><button onClick={() => toggle("plan")} className="text-white hover:text-gray-300 w-full text-left">Plans</button></li> */}
                  {/* <li><button onClick={() => toggle("subscription")} className="text-white hover:text-gray-300 w-full text-left">Subscription</button></li> */}
                  <li><button onClick={() => toggle("faq")} className="text-white hover:text-gray-300 w-full text-left">FAQ</button></li>
                  <li><button onClick={() => toggle("settings")} className="text-white hover:text-gray-300 w-full text-left">Settings</button></li>
                </ul>
              </nav>
            )}
            <div className="flex-1">
              <main className="p-2">
                {path === "home" && <Dashboard />}
                {path === "history" && <History />}
                {path === "word-history" && <WordHistory />}
                {path === "reading-resources" && <ReadingResources />}
                {/* {path === "plan" && <Plans />} */}
                {/* {path === "subscription" && <SubscriptionManagement />} */}
                {path === "faq" && <Faq />}
                {path === "settings" && <Settings />}
              </main>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
     <UserProvider>
       <LocaleProvider>
         <OptionsPage />
       </LocaleProvider>
     </UserProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);
