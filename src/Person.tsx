import { Entry } from "./types/Entries";
import * as React from "react";

type PersonProps = {
    person: Entry
}

export default function Person(props: PersonProps) {
    const { person } = props;
    
    return (
      <div>
          {person.name} {person.rating}
      </div>
    );
}