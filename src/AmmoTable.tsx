type Ammo = {
  name: string;
  caliber: string;
  penetration: number;
  damage: number;
}

type AmmoTableProps = {
  ammoList: Ammo[];
}

export function AmmoTable(props: AmmoTableProps) {
  return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Caliber</th>
              <th>Damage</th>
              <th>Penetration</th>
            </tr>
          </thead>

          <tbody>
            {props.ammoList.map(ammo => (
              <tr key={ammo.name}>
                <td>{ammo.name}</td>
                <td>{ammo.caliber}</td>
                <td>{ammo.damage}</td>
                <td>{ammo.penetration}</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
}