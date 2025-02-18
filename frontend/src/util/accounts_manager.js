
export default async function validateUser ()  {
    var valid = false
    const token = getCookie('auth_token')

    
    var response
    const checkUser = async () => {
        let form = new FormData()
        form.append('auth_token',token) 
        response  = await fetch("/api/accounts/validate_token",{
            method: 'POST',
            body: form
        })

        if (await response.ok){
             valid = true
        }
        
    }

    await checkUser()
    return valid

}

async function validateUserByStoreId (storeId) {
    var valid = false
    const token = getCookie('auth_token')

    
    var response
    const checkUser = async () => {
        response  = await fetch("/api/accounts/validate_token/store/" + storeId,{
            method: 'GET',
        })

        if (await response.ok){
             valid = true
        }
        
    }

    await checkUser()
    return valid

}

async function validateUserByProductId (productId) {
    var valid = false
    const token = getCookie('auth_token')

    
    var response
    const checkUser = async () => {
        response  = await fetch("/api/accounts/validate_token/product/" + productId,{
            method: 'GET',
        })

        if (await response.ok){
             valid = true
        }
        
    }

    await checkUser()
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

export {validateUser,validateUserByStoreId}