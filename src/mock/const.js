const TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Checkin', 'Sightseeng', 'Restaurant'];

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const PNG = [
  'img/icons/checkin.png',
  'img/icons/bus.png',
  'img/icons/drive.png',
  'img/icons/flight.png',
  'img/icons/restaurant.png',
  'img/icons/ship.png',
  'img/icons/sightseeng.png',
  'img/icons/taxi.png',
  'img/icons/train.png',
  'img/icons/transport.png'
]

const DESCS = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'
  ];

const CITIES = ['Moscow', 'Paris', 'Boston', 'Pekin', 'London'];

const FORM_DATE_FORMAT_ONE = 'YY/MM/DDTHH:mm';

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const OFFER_OPTIONS = {
  Taxi: [
    { title: 'Rent a car',
      price: 100
    }, 
    {
      title: 'Order a Buisness Class',
      price: 200
    }
      ],
  Bus: [
    {
      title: 'Order drinks',
      price: 10
    }, 
    {
      title: 'Take a seat close to window',
      price: 20  
    }
    ],
  Train: [
    {
      title:'Take a lower bed',
      price: 20
    }, 
    {
      title: 'Order a breakfast',
      price: 15
    }, 
    {
      title: 'Take a shower',
      price: 5
    }
    ],
  Ship: [
    {
      title: 'Take a lux room',
      price: 300
    }, 
    {
      title: 'Order a breakfast',
      price: 20
    }, 
    {
      title: 'Take a spa',
      price: 50
    }
    ],
  Transport: [
    {
      title: 'Order Uber',
      price: 100
    }, 
    {
      title: 'Switch to comfort',
      price: 70
    }, 
    {
      title: 'Choose the radio station',
      price: 5
    }
    ],
  Drive: [
    {
      title: 'Take a fast paid road',
      price: 80
    }, 
    {
      title: 'Switch to comfort',
      price: 60
    }, 
    {
      title: 'Take a buisness class',
      price: 150  
    }
    ],
  Flight: [
    {
      title: 'Order a breakfast',
      price: 15  
    }, 
    {
      title: 'Take a buisness class',
      price: 100  
    }
    ],
  Checkin: [
    {
      title: 'Take a lux room',
      price: 140
    }, 
    {
      title: 'Order a breakfast',
      price: 30
    }, 
    {
      title: 'Order a dinner',
      price: 40
    }
    ],
  Sightseeng: [
    {
      title: 'Order uber',
      price: 90
    }
    ],
  Restaurant: [
    {
      title: 'Take a wine',
      price: 20  
    }, 
    {
      title: 'Order bigtesty',
      price: 40
    }
    ]
}


export { TYPE, DESCS, CITIES, PNG, FORM_DATE_FORMAT_ONE, SortType, OFFER_OPTIONS, UserAction, UpdateType}