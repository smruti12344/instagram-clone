// export const timePost = (timestamp)=>{
//     const now =Date.now();
//     const seconds = Math.floor((now-timestamp)/1000);

//     if(seconds<60){
//         return `${seconds}s ago`;
//     }else if(seconds < 3600){
//        const minutes = Math.floor(seconds/60);
//        return `${minutes}m ago`;
//     } else if(seconds < 86400){
//         const hours = Math.floor(seconds/3600);
//         return `${hours}h ago`;
//      }else if(seconds < 604800){
//         const day = Math.floor(seconds/86400);
//         return `${day}d ago`;
//      }else{
//         const weeks = Math.floor(seconds/604800);
//         return `${weeks}w ago`;
//      }
// }
export const timePost = (timestamp) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    const intervals = [
        { label: 'w', seconds: 604800 },
        { label: 'd', seconds: 86400 },
        { label: 'h', seconds: 3600 },
        { label: 'm', seconds: 60 },
        { label: 's', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count}${interval.label} ago`;
        }
    }

    return 'just now';
};
