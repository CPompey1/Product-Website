
export default async function validateUser ()  {
    var valid = false
    const token = getCookie('auth_token')

    
    var response
    const checkUser = async () => {
        let form = new FormData()
        form.append('auth_token',token) 
        response  = await fetch("/api/validate_token",{
            method: 'POST',
            body: form
        })

        if (await response.ok){
            valid = true
        }
        
    }

    checkUser()
    return valid

}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}