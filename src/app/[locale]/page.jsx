import Input from "@/components/Input";
import Image from "next/image";
import '../main.scss';
import CratesWrapper from "@/components/SingleCategory/SingleCategory";
import { categories } from "@/constants/categories";
import SingleCrate from "@/components/SingleCrate/SingleCrate";

export default function Home() {

  return (
    <div className="main__container home__container">
      <div className="main__wrapper">
        {/* <div className="title__wrapper">
          <h2 className="font">Counter-Strike 2 Cases</h2>

          <Input />
        </div>

        <CratesWrapper /> */}

        <div className="categories__wrapper main-collection__grid">
          {categories.map((category, i) => (
            <div className="collection__card" key={i}>
              <SingleCrate
                name={category.name}
                image={category.image}
                id={category.id}
                href={category.href}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
