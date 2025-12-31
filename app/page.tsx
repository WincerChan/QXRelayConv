"use client"
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    
    fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        "password": password,
        "remember": rememberMe
      })
    }).then(x => x.json())
      .then(t => {
        setLoading(false);
        if (t && t.err) {
          setError(t.err)
        } else {
          window.location.href = t.location
        }
      }).catch(() => {
        setLoading(false);
        setError("网络错误，请稍后重试");
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-card text-card-foreground shadow-sm border rounded-xl p-8">
          <div className="flex flex-col space-y-1.5 p-0 mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">认证以继续</h1>
            <p className="text-sm text-muted-foreground">请输入您的密码以访问控制面板</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                密码
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-primary text-primary shadow focus:ring-primary"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                7天内免登录
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {loading ? (
                 <Icon icon="line-md:loading-loop" className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              登录
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-destructive/15 text-destructive text-sm flex items-center">
               <Icon icon="solar:danger-circle-bold" className="mr-2 h-4 w-4" />
               {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}