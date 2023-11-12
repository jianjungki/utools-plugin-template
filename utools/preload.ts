// 您可以在进行窗口交互
// utools文档

import { ipcRenderer } from "electron"

// https://www.u.tools/docs/developer/api.html#%E7%AA%97%E5%8F%A3%E4%BA%A4%E4%BA%92
let count = 0
const getCount = () => {
    return ++count
}

const isUtools=!!window?.utools

const createChildWindow = async (path:string) => {
    if(isUtools){
        const win = utools.createBrowserWindow('./index.html', {
            // @ts-ignore
            // 此处类型：https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions
            // utools dev docs：https://u.tools/docs/developer/api.html#%E7%AA%97%E5%8F%A3%E4%BA%A4%E4%BA%92
            title: `utools插件开发模板子窗口${getCount()}`,
        }, () => {
            // 显示窗口
            win.show()
            // 聚焦窗口
            win.focus();
            // 开发模式下开启调试工具
            if (utools.isDev()) {
                win.webContents.openDevTools();
            }
        })
    }else{
        ipcRenderer.invoke('createChildWindow',path)
    }
}

window.createWindow = (path='') => {
    createChildWindow(path)
}