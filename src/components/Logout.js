import { useEffect } from 'react';

function LogoutPage() {
    useEffect((res) => {
        localStorage.setItem("jwt", null);
        localStorage.setItem("id", null)
        localStorage.setItem("name", null);
        localStorage.setItem("email", null);
        localStorage.setItem("logined", false);

        window.location='/login'
        
    })
    return(
        <div>
            Çıkış Yapılıyor...
        </div>
    )
}

export default LogoutPage;