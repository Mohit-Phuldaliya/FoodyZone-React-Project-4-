import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter(
      (food) => food.name.toLowerCase().includes(searchValue.toLowerCase())
      // {
      //   if (food.name.toLowerCase() === searchValue.toLowerCase()) return food;
      //   else if (searchValue.toLowerCase() === "") return food;
      // }
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "ALL",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading....</div>;
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="Images/logo.svg" alt="" />
          </div>
          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food"
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((food) => (
            <Button
              isSelected={selectedBtn === food.type}
              key={food.name}
              onClick={() => filterFood(food.type)}
            >
              {food.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 48px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0<width<600px) {
    flex-direction: column;
    height: 120px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? "black" : "#f22f2f")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#f22f2f")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: brown;
  }
`;
