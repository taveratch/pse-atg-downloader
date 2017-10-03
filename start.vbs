Set Wshshell = WScript.CreateObject("WScript.Shell")
Return = WshShell.run("cmd.exe /C forever start \proxy-server\server.js", 0, true)