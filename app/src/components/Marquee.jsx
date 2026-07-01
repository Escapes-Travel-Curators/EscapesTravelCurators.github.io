const ITEMS = [
  { icon: 'fa-solid fa-umbrella-beach', label: 'Villa Escapes'      },
  { icon: 'fa-solid fa-ring',            label: 'Honeymoons'         },
  { icon: 'fa-solid fa-landmark',        label: 'European Summers'   },
  { icon: 'fa-solid fa-passport',        label: 'Visa Support'       },
  { icon: 'fa-solid fa-car',             label: 'Private Transfers'  },
  { icon: 'fa-solid fa-hotel',           label: 'Luxury Stays'       },
  { icon: 'fa-solid fa-water',           label: 'Island Retreats'    },
  { icon: 'fa-solid fa-city',            label: 'City Weekends'      },
  { icon: 'fa-solid fa-plane',           label: 'Business Travel'    },
  { icon: 'fa-solid fa-mountain',        label: 'Mountain Escapes'   },
];

// Duplicate for seamless CSS loop
const ALL = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="marquee-section" aria-label="Travel styles we curate">
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-inner">
          {ALL.map((item, i) => (
            <span key={i}>
              <i className={item.icon} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
