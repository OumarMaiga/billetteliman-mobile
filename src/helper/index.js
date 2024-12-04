// Formater la date en short lisible Ex: Dim 21 janv
export const convertToDate = (date) => {
    date = new Date(date);
    let d = date.getDate();
    let day = date.getDay();
    let m = date.getMonth();
    let y = date.getFullYear();
    let dayArray = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    let monthArray = ["janv", "févr", "mars", "avril", "mai", "juin", "juill", "août", "sept", "oct", "nov", "déc"];
    return dayArray[day] + ' ' + (d <= 9 ? '0' + d : d) + ' ' + monthArray[m] + ' ' + (y != new Date().getFullYear() ? y : "");
}

export const dateTimeFormat = (timestamp, hour) => {
    let date = convertToDate(new Date(timestamp*1000));
    hour = hour.slice(0,5);
    return  date + hour;
}

// Formater la date en short lisible Ex: Dim 21 janv
export const convertToDateHour = (date) => {
    date = new Date(date);
    let d = date.getDate();
    let day = date.getDay();
    let m = date.getMonth();
    let y = date.getFullYear();
    let h = date.getHours();
    let mn = date.getMinutes();
    let dayArray = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    let monthArray = ["janv", "févr", "mars", "avril", "mai", "juin", "juill", "août", "sept", "oct", "nov", "déc"];
    return dayArray[day] + ' ' + (d <= 9 ? '0' + d : d) + ' ' + monthArray[m] + (y != new Date().getFullYear() ? y : "") + ' à ' + (h <= 9 ? '0' + h : h) +'h' + (mn <= 9 ? '0' + mn : mn)
}


export const priceFormat = (price) => {
    
    let priceFormat = price.toLocaleString('fr-FR', {style:'currency', currency: 'XOF'});

    priceFormat = priceFormat.replace(/,00\s/, '');

    return priceFormat;
}
