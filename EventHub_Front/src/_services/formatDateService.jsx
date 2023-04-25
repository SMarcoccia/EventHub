

// yyyy-MM-ddTHH:mm:ss.sssZ to yyyy-MM-dd'T'HH:mm
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

/**
 * @param {Object} data : le tableau d'objet contenant les dates.
 * @param {String} date : nom de la propriété associé à la date doit être une string.
 * @returns {Object}le tableau d'objet.
 * @description Convertit toutes les dates se trouvant dans un tableau d'objet.
 */
const convertAllDatesFr=(data, date)=>{
    data.map((event)=>{
        event[date]=dateConvertFr(event[date])
        return event;
    })
    return data
}

export const formatDateService={
    convertAllDatesFr, dateConvertFr, dateFormatEngReduced
}