import dayjs from "dayjs";
export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
     {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
     {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
]
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId)
    return deliveryOption || deliveryOptions[0];
}
export function getDeliveryDate(deliveryOption) {
          let today = dayjs();
          //const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
          let dateString = '';
          let  deliveryDays = deliveryOption.deliveryDays
          while (deliveryDays > 0) {
            
            today  = today.add(1, 'days');
            const currentDay = today.day();
            if (currentDay !== 0 && currentDay !== 6 ) {
                deliveryDays --;
            }
             dateString = today.format('dddd MMMM, D');
          }
          return  dateString
          
}