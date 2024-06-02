interface RatingProps {
    value: number;

    onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
    return (
      <ul className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <li key={star} onClick={() => onChange(star)}>
            <svg
              className={`mt-3 w-8 text-cyan-500 hover:scale-105 cursor-pointer ${value >= star ? 'fill-current' : ''}`}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"
              />
            </svg>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Rating;