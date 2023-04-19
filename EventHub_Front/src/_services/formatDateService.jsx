
// yyyy-MM-dd'T'HH:mm
const dateFormatEngReduced=()=>{
    let date=new Date();
    return date.getFullYear()+"-"+('0'+(date.getMonth()+1)).slice(-2)+"-"+('0'+date.getDate()).slice(-2)+"T"+('0'+date.getHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2)
}

// Donne la date en français.
const dateConvertFr = (date)=>{
    date=new Date(date);
    date = ('0'+date.getDate()).slice(-2)+"-"+('0'+(date.getMonth()+1)).slice(-2)+"-"+date.getFullYear()+" "+('0'+date.getHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2);
    return date;
}

export const formatDateService={
    dateConvertFr, dateFormatEngReduced
}