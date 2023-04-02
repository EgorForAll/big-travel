const TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Checkin', 'Sightseeng', 'Restaurant'];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType ={
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
}

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
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lectus lectus, mattis dictum fermentum id, fermentum at arcu. Curabitur scelerisque laoreet fermentum. Mauris diam massa, lobortis at tincidunt a, auctor eu ante. Nulla tincidunt ligula id nibh molestie aliquet. Praesent sit amet urna eros. Mauris tempus justo sed blandit volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut rhoncus diam orci, ac dignissim urna aliquet ac. Nullam lacinia ac turpis nec mollis. Pellentesque nec sodales est. Maecenas semper ut diam vulputate rutrum. Phasellus molestie tempor ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac orci mattis, pellentesque massa eu, sodales lorem. Proin molestie consectetur mauris eu tristique. Ut sed porttitor velit. Mauris sit amet nulla id justo efficitur accumsan. Cras sit amet risus sed ante sagittis varius quis at nulla. Cras eu imperdiet nunc, ut posuere erat. Nam finibus, felis ullamcorper mattis hendrerit, ipsum metus rutrum tortor, eget pellentesque nulla metus a neque. Cras nec purus ac ante pretium iaculis. Maecenas vulputate urna ac euismod luctus. Vestibulum viverra feugiat sapien, ac volutpat ante.',
    
  ];

const CITIES = ['Moscow', 'Paris', 'Boston', 'Pekin', 'London'];

const FORM_DATE_FORMAT_ONE = 'YY/MM/DDHH:mm';

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


export { TYPE, DESCS, CITIES, PNG, FORM_DATE_FORMAT_ONE, SortType, OFFER_OPTIONS, UserAction, UpdateType, FilterType}