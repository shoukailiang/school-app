type RedirectInfo = {
  type: 'boss' | 'genius';
  avatar?: string;
};

export function getRedirectPath({ type, avatar }:RedirectInfo ):string {
    // 根据登录信息，返回跳转地址
    // user.type /boss /genius
    // user.avatar /bossinfo  /geniusinfo
    let url = (type === 'boss') ? '/boss' : '/genius'
    if (!avatar) {
      url += 'info'
    }
    return url
  }
  export function getChatId(userid:string, targetid:string):string {
    // 用sort，为了解决（userId和targetId谁在前都无所谓）
    return [userid, targetid].sort().join('_')
  }