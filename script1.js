        let	text = document.getElementById('text');
        let	bangunan = document.getElementById('bangunan');
        let	police = document.getElementById('police');
        let	awan = document.getElementById('awan');
        let	air = document.getElementById('air');
        let	pesawat = document.getElementById('pesawat');
        let	burung = document.getElementById('burung');
        window.addEventListener("scroll", () => {
	    let value = window.scrollY;

    	text.style.marginTop = value * 2.5 + "px";
        air.style.marginTop = value * 2.5 + "px";
    	bangunan.style.marginTop = value * 1 + "px";
        awan.style.left = value * 2 + "px";
        police.style.left = value * 5 + "px";
        pesawat.style.left = value * -5 + "px";
        burung.style.left = value * 3 + "px";
})