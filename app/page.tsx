"use client"
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your login logic here
    fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        "password": password,
        "remember": rememberMe
      })
    }).then(x => x.json())
      .then(t => {
        if (t && t.err) {
          setError(t.err)
        } else {
          window.location.href = t.location
        }
      })
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="pb-24">
          <form
            onSubmit={handleSubmit}
            className="mt-0 space-y-4 rounded-lg w-[32rem] "
          >
            <h1 className="md:text-4xl text-3xl font-bold mb-12 text-center">认证以继续</h1>
            <div>
              <label htmlFor="password" className="text-sm font-medium">密码</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center mt-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="block ml-2 text-sm text-gray-900">
                  7天内免登陆
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              登录
            </button>
          </form>
          {error && <div className="text-lg text-red-700 mt-8">登陆失败：{error}</div>}
        </div>
      </div>
    </>
  );

}
