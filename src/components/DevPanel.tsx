import React, { useState } from 'react';

export const DevPanel = () => {
  const [open, setOpen] = useState(false);

  // @ts-ignore
  if (!import.meta.env.DEV) return null;

  const handleScenario = (scenario: string, role?: string) => {
    localStorage.setItem('MOCK_SCENARIO', scenario);
    if (role) {
      localStorage.setItem('MOCK_ROLE', role);
    }
    window.location.reload();
  };

  const clearToken = () => {
    localStorage.removeItem('MOCK_TOKEN');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {open ? (
        <div className="bg-white border border-gray-300 shadow-xl p-4 w-64 text-sm font-mono text-gray-800">
          <div className="flex justify-between font-bold mb-4 border-b pb-2">
            <span>MSW Dev Panel</span>
            <button onClick={() => setOpen(false)} className="text-red-500 hover:bg-red-50 p-1 px-2 rounded">X</button>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-xs text-gray-400 uppercase mt-2">Login Simulation</p>
            <button onClick={() => handleScenario('success', 'member')} className="block w-full text-left hover:bg-gray-100 p-1">Login as: Member</button>
            <button onClick={() => handleScenario('success', 'admin')} className="block w-full text-left hover:bg-gray-100 p-1">Login as: Admin</button>
            
            <p className="font-semibold text-xs text-gray-400 uppercase mt-4">API Errors</p>
            <button onClick={() => handleScenario('401')} className="block w-full text-left hover:bg-red-50 p-1 text-red-600 border border-red-100">Force 401 Unauthorized</button>
            <button onClick={() => handleScenario('500')} className="block w-full text-left hover:bg-red-50 p-1 text-red-600 border border-red-100">Force 500 Server Error</button>
            
            <hr className="my-3 border-gray-200" />
            <button onClick={clearToken} className="block w-full text-left bg-gray-100 hover:bg-gray-200 p-2 font-bold text-center">Clear Token (Logout)</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="bg-[#1A1A1A] text-white px-4 py-2 shadow-lg font-mono text-xs opacity-70 hover:opacity-100 transition-opacity">
          ⚙️ Dev API Panel
        </button>
      )}
    </div>
  );
};
