import * as React from "react";
import Person from "./Person";
import { Entry } from "./types/Entries";

type GroupProps = {
    entries: Entry[]
}

export default function Group(props: GroupProps) {
    const { entries } = props;

    const people = entries.map((entry) => {
        return (
            <Person person={entry}></Person>
        )
    })
    
    return (
      <div>
          {people}
      </div>
    );
}