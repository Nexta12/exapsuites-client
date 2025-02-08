export const scrollUP = () => {
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  export const extractNumber = (str) => parseInt(str.match(/\d+/)?.[0] || "0", 10);

  export const DateFormatter = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][
      (day % 10 > 3 || [11, 12, 13].includes(day % 100)) ? 0 : day % 10
    ];
  
    return date.toLocaleDateString("en-US", { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).replace(/\d+/, `${day}${suffix}`);
  };

  // Helper Function to extract Nested object from Table
  export const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc && acc[key] ? acc[key] : '', obj);
  };

  
