import React, { Component } from "react";
import { MDBCard, MDBCardHeader, MDBRow, MDBCol, MDBIcon, MDBDataTable } from "mdbreact";
import NavPerm from "../NavPerms";
import Send from "../send";
import Select from "react-select";
import BidAnalytics from "./BidAnalytics";

class BidDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [
        {
          label: "None | DMU - PPA",
          value: 1,
        },
        {
          label: "None | BAYAMON BRANCH STA",
          value: 2,
        },
        {
          label: "None | NAGUABO",
          value: 3,
        },
        {
          label: "None | SAN JUAN P&DC",
          value: 4,
        },
        {
          label: "None | GUAYNABO",
          value: 5,
        },
        {
          label: "None | ARECIBO",
          value: 6,
        },
        {
          label: "None | CAROLINA",
          value: 7,
        },
        {
          label: "None | PONCE",
          value: 8,
        },
        {
          label: "None | AIBONITO",
          value: 9,
        },
        {
          label: "None | LOS LLANOS (N.O.)",
          value: 10,
        },
        {
          label: "None | COAMO",
          value: 11,
        },
        {
          label: "None | BO SANTA CATALINA (N.O.)",
          value: 12,
        },
        {
          label: "None | CIALES",
          value: 13,
        },
        {
          label: "None | BO YUNES (N.O.)",
          value: 14,
        },
        {
          label: "None | MOROVIS",
          value: 15,
        },
        {
          label: "None | BO PERCHAS (N.O.)",
          value: 16,
        },
        {
          label: "None | CAYEY",
          value: 17,
        },
        {
          label: "None | BO MATON (N.O.)",
          value: 18,
        },
        {
          label: "None | JULIO VEQUILLA STORE (N.O.)",
          value: 19,
        },
        {
          label: "None | FLORIDA",
          value: 20,
        },
        {
          label: "None | BO CORTES (N.O.)",
          value: 21,
        },
        {
          label: "None | RIO GRANDE",
          value: 22,
        },
        {
          label: "None | BARRIO JUAN GONZALEZ (N.O.)",
          value: 23,
        },
        {
          label: "None | BO CALABAZAS (N.O.)",
          value: 24,
        },
        {
          label: "None | JUANA DIAZ",
          value: 25,
        },
        {
          label: "None | CARR 14 (N.O.)",
          value: 26,
        },
        {
          label: "None | BOQUERON",
          value: 27,
        },
        {
          label: "None | SECTOR COMBATE (N.O.)",
          value: 28,
        },
        {
          label: "None | VEGA BAJA",
          value: 29,
        },
        {
          label: "None | CEIBA",
          value: 30,
        },
        {
          label: "None | DESVIO FELISA RINCON (N.O.)",
          value: 31,
        },
        {
          label: "None | BARRANQUITAS",
          value: 32,
        },
        {
          label: "None | SECTOR EL AMPARO (N.O.)",
          value: 33,
        },
        {
          label: "None | AGUADA",
          value: 34,
        },
        {
          label: "None | HC 58 BOX 15102 (N.O.)",
          value: 35,
        },
        {
          label: "None | BO CERRO GORDO (N.O.)",
          value: 36,
        },
        {
          label: "None | YABUCOA",
          value: 37,
        },
        {
          label: "None | BO LA PICA (N.O.)",
          value: 38,
        },
        {
          label: "None | OROCOVIS",
          value: 39,
        },
        {
          label: "None | RD 5567 VAGA 1 SEC GERMAN SOTO",
          value: 40,
        },
        {
          label: "None | RD 149 KM 44.6 (N.O.)",
          value: 41,
        },
        {
          label: "None | CANOVANAS",
          value: 42,
        },
        {
          label: "None | SECTOR LAS 400 (N.O.)",
          value: 43,
        },
        {
          label: "None | LOIZA",
          value: 44,
        },
        {
          label: "None | SANTA ISABEL",
          value: 45,
        },
        {
          label: "None | LOS FLACOS (N.O.)",
          value: 46,
        },
        {
          label: "None | YAUCO",
          value: 47,
        },
        {
          label: "None | BO. CARRIZALEZ (N.O.)",
          value: 48,
        },
        {
          label: "None | COTO LAUREL",
          value: 49,
        },
        {
          label: "None | BO REAL ANON (N.O.)",
          value: 50,
        },
        {
          label: "None | BO MONACILLOS (N.O.)",
          value: 51,
        },
        {
          label: "None | GUAYANILLA",
          value: 52,
        },
        {
          label: "None | CASTANER",
          value: 53,
        },
        {
          label: "None | AGUIRRE",
          value: 54,
        },
        {
          label: "None | BARCELONETA",
          value: 55,
        },
        {
          label: "None | MAGUEYES BR (N.O.)",
          value: 56,
        },
        {
          label: "None | BO CAMARONES (N.O.)",
          value: 57,
        },
        {
          label: "None | SABANA SECA",
          value: 58,
        },
        {
          label: "None | ADJUNTAS",
          value: 59,
        },
        {
          label: "None | CENTRAL PELLEJAS (N.O.)",
          value: 60,
        },
        {
          label: "None | VILLALBA",
          value: 61,
        },
        {
          label: "None | BO. TIERRA SANTA (N.O.)",
          value: 62,
        },
        {
          label: "None | COROZAL",
          value: 63,
        },
        {
          label: "None | BO PADILLA (N.O.)",
          value: 64,
        },
        {
          label: "None | BO GUARAGUAO (N.O.)",
          value: 65,
        },
        {
          label: "None | ENSENADA",
          value: 66,
        },
        {
          label: "None | TOA BAJA",
          value: 67,
        },
        {
          label: "None | CAGUAS",
          value: 68,
        },
        {
          label: "None | BO CANAS (N.O.)",
          value: 69,
        },
        {
          label: "None | BO ARALLANES (N.O.)",
          value: 70,
        },
        {
          label: "None | RD 185 KM 16.2 (N.O.)",
          value: 71,
        },
        {
          label: "None | PARC RAMON T COLON (N.O.)",
          value: 72,
        },
        {
          label: "None | TRUJILLO ALTO STA",
          value: 73,
        },
        {
          label: "None | SECTOR VILLA ESCONDIDA (N.O.)",
          value: 74,
        },
        {
          label: "None | PALO HINCADO (N.O.)",
          value: 75,
        },
        {
          label: "None | JAYUYA",
          value: 76,
        },
        {
          label: "None | BO CUCHILLAS (N.O.)",
          value: 77,
        },
        {
          label: "None | HC 01 BOX 6673",
          value: 78,
        },
        {
          label: "None | SECTOR GUAYABO (N.O.)",
          value: 79,
        },
        {
          label: "None | SECTOR LAS MAYAS (N.O.)",
          value: 80,
        },
        {
          label: "None | LUQUILLO",
          value: 81,
        },
        {
          label: "None | BO PITAHAYA (N.O.)",
          value: 82,
        },
        {
          label: "None | ESTANCIAS DEL CAMINO (N.O.)",
          value: 83,
        },
        {
          label: "None | CASTANER BRIDGE (N.O.)",
          value: 84,
        },
        {
          label: "None | BO MAGUEYES (N.O.)",
          value: 85,
        },
        {
          label: "None | SECTOR DANIEL NEGRON (N.O.)",
          value: 86,
        },
        {
          label: "None | BO LA BARRA (N.O.)",
          value: 87,
        },
        {
          label: "None | PARCELAS DAVILA N.O.",
          value: 88,
        },
        {
          label: "None | SECTOR CUCHILLAS N.O.",
          value: 89,
        },
        {
          label: "None | CARR. 174 (N.O.)",
          value: 90,
        },
        {
          label: "None | UNK RD TO BO PUNADO MANATI",
          value: 91,
        },
        {
          label: "None | ROAD 159 (N.O.)",
          value: 92,
        },
        {
          label: "None | SECTOR RONDON (N.O.)",
          value: 93,
        },
        {
          label: "None | TRES CAMINOS RD (N.O.)",
          value: 94,
        },
        {
          label: "None | BO SONADORA (N.O.)",
          value: 95,
        },
        {
          label: "None | RIVER VALLEY (N.O.)",
          value: 96,
        },
        {
          label: "None | CUIDAD JARDIN (N.O.)",
          value: 97,
        },
        {
          label: "None | SECTOR LAS ARENAS (N.O.)",
          value: 98,
        },
        {
          label: "None | PALMARITO (N.O.)",
          value: 99,
        },
        {
          label: "None | SANTA ANA (N.O.)",
          value: 100,
        },
        {
          label: "None | INT 128 (N.O.)",
          value: 101,
        },
        {
          label: "None | BO PALMAREJO (N.O.)",
          value: 102,
        },
        {
          label: "None | BO. DOS BOCAS 11 (N.O.)",
          value: 103,
        },
        {
          label: "None | SECTOR LOS VETERANOS (N.O.)",
          value: 104,
        },
        {
          label: "None | BO JOLLA FRIA (N.O.)",
          value: 105,
        },
        {
          label: "None | FEDEX SAN JUAN",
          value: 106,
        },
        {
          label: "None | AGUADILLA",
          value: 107,
        },
        {
          label: "None | MAYAGUEZ",
          value: 108,
        },
        {
          label: "None | LA PICA (N.O.)",
          value: 109,
        },
        {
          label: "None | BO HOYAS (N.O.)",
          value: 110,
        },
        {
          label: "None | AGUAS BUENAS",
          value: 111,
        },
        {
          label: "None | SECTOR EL VERDE (N.O.)",
          value: 112,
        },
        {
          label: "None | BO PALOMAS (N.O.)",
          value: 113,
        },
        {
          label: "None | SAN LORENZO",
          value: 114,
        },
        {
          label: "None | CARPIO ROTGER (N.O.)",
          value: 115,
        },
        {
          label: "None | PARCELAS FLORIDA (N.O.)",
          value: 116,
        },
        {
          label: "None | GUANICA",
          value: 117,
        },
        {
          label: "None | SECTOR LAS LATAS (N.O.)",
          value: 118,
        },
        {
          label: "None | BO COLLORES (N.O.)",
          value: 119,
        },
        {
          label: "None | PENUELAS",
          value: 120,
        },
        {
          label: "None | BO. QUEBRADA COTO (N.O.)",
          value: 121,
        },
        {
          label: "None | MOCA",
          value: 122,
        },
        {
          label: "None | CAPA BOQUEZ (N.O.)",
          value: 123,
        },
        {
          label: "None | GURABO",
          value: 124,
        },
        {
          label: "None | BO LA GLORIA (N.O.)",
          value: 125,
        },
        {
          label: "None | BRISAS TORTUGUERO (N.O.)",
          value: 126,
        },
        {
          label: "None | JUNCOS",
          value: 127,
        },
        {
          label: "None | BO VALENCIANO ABAJO (N.O.)",
          value: 128,
        },
        {
          label: "None | LAS PIEDRAS",
          value: 129,
        },
        {
          label: "None | BO TOMAS DE CASTRO (N.O.)",
          value: 130,
        },
        {
          label: "None | PATILLAS",
          value: 131,
        },
        {
          label: "None | CARR 3 KM 11 (N.O.)",
          value: 132,
        },
        {
          label: "None | CARR 3 KM 112.1 (N.O.)",
          value: 133,
        },
        {
          label: "None | LA PLATA",
          value: 134,
        },
        {
          label: "None | COMERIO",
          value: 135,
        },
        {
          label: "None | HUMACAO",
          value: 136,
        },
        {
          label: "None | RIO BLANCO",
          value: 137,
        },
        {
          label: "None | SECTOR LOS ROBLES (N.O.)",
          value: 138,
        },
        {
          label: "None | CAMP GUAVATE (N.O.)",
          value: 139,
        },
        {
          label: "None | BO. PENA POBRE (N.O.)",
          value: 140,
        },
        {
          label: "None | LA PLACITA (N.O.)",
          value: 141,
        },
        {
          label: "None | JAQUEYES ABAJO (N.O.)",
          value: 142,
        },
        {
          label: "None | BO BEATRIZ (N.O.)",
          value: 143,
        },
        {
          label: "None | BO. JAGUEYES (N.O.)",
          value: 144,
        },
        {
          label: "None | CARR 181 KM 17.5 (N.O.)",
          value: 145,
        },
        {
          label: "None | LEVITTOWN STATION",
          value: 146,
        },
        {
          label: "None | BO PAJAROS (N.O.)",
          value: 147,
        },
        {
          label: "None | VEGA ALTA",
          value: 148,
        },
        {
          label: "None | HERRERA BRIDGE (N.O.)",
          value: 149,
        },
        {
          label: "None | BARRIO MARIAS (N.O.)",
          value: 150,
        },
        {
          label: "None | RINCON",
          value: 151,
        },
        {
          label: "None | COL LOS PUENTES (N.O.)",
          value: 152,
        },
        {
          label: "None | LARES",
          value: 153,
        },
        {
          label: "None | BO ESPINO (N.O.)",
          value: 154,
        },
        {
          label: "None | BO BARINAS (N.O.)",
          value: 155,
        },
        {
          label: "None |  CIENEQUETA (N.O)",
          value: 156,
        },
        {
          label: "None | BO QUEBRADA ARENAS (N.O.)",
          value: 157,
        },
        {
          label: "None | BO CRUCES SEC ATALAYA (N.O.)",
          value: 158,
        },
        {
          label: "None | SECTOR LAS BOCAS KM 7.6 (N.O.)",
          value: 159,
        },
        {
          label: "None | BAIROA (LA 25) (N.O.)",
          value: 160,
        },
        {
          label: "None | BO RANCHERAS (N.O.)",
          value: 161,
        },
        {
          label: "None | HC 03 BOX 39620 (N.O.)",
          value: 162,
        },
        {
          label: "None | BO ROBLES (N.O.)",
          value: 163,
        },
        {
          label: "None | BO. TURABO (N.O)",
          value: 164,
        },
        {
          label: "None | EL COLLADO (N.O.)",
          value: 165,
        },
        {
          label: "None | MINILLAS (N.O.)",
          value: 166,
        },
        {
          label: "None | SECTOR LA ALDEA",
          value: 167,
        },
        {
          label: "None | SECTOR NARANJITO PR (N.O.)",
          value: 168,
        },
        {
          label: "None | RAMON RIOS",
          value: 169,
        },
        {
          label: "None | ALTURAS DE HATO NUEVO (N.O.)",
          value: 170,
        },
        {
          label: "None | JCT RD 771 KM 9.3 (N.O.)",
          value: 171,
        },
        {
          label: "None | IGLESIA COOP",
          value: 172,
        },
        {
          label: "None | JCT ROADS 780 & 167 (N.O.)",
          value: 173,
        },
        {
          label: "None | BO CEIBA NORTE (N.O.)",
          value: 174,
        },
        {
          label: "None | SECTOR MALPASO (N.O.)",
          value: 175,
        },
        {
          label: "None | PARCELAS ACEITUNAS (N.O.)",
          value: 176,
        },
        {
          label: "None | CERRO LOS CABROS (N.O.)",
          value: 177,
        },
        {
          label: "None | SECTOR LA TUMBA (N.O.)",
          value: 178,
        },
        {
          label: "None | JCT ROADS 167 & 156 (N.O.)",
          value: 179,
        },
        {
          label: "None | BO PINAS (N.O.)",
          value: 180,
        },
        {
          label: "None | VIEQUES AIRPORT",
          value: 181,
        },
        {
          label: "None | ISABEL II / SECTOR MONTE SANTO",
          value: 182,
        },
        {
          label: "None | MAUNABO",
          value: 183,
        },
        {
          label: "None | BO EMAJAGUA (N.O.)",
          value: 184,
        },
        {
          label: "None | JCT RD-3 (N.O.)",
          value: 185,
        },
        {
          label: "None | BO. RINCON (N.O.)",
          value: 186,
        },
        {
          label: "None | BO. MAMEY (N.O.)",
          value: 187,
        },
        {
          label: "None | BO. CERTENEJAS (N.O.)",
          value: 188,
        },
        {
          label: "None | BO TEJAS (N.O.)",
          value: 189,
        },
        {
          label: "None | BO ARENAS (N.O.)",
          value: 190,
        },
        {
          label: "None | BO MONTONES III",
          value: 191,
        },
        {
          label: "None | VILLA SILVESTRE (N.O.)",
          value: 192,
        },
        {
          label: "None | QUEBRADA CEIBA (N.O.)",
          value: 193,
        },
        {
          label: "None | BO AGUACATE (N.O.)",
          value: 194,
        },
        {
          label: "None | MOGOTE (N.O.)",
          value: 195,
        },
        {
          label: "None | COM JAJOME RD 15 KM 11.1(N.O.)",
          value: 196,
        },
        {
          label: "None | BO FARALLON (N.O.)",
          value: 197,
        },
        {
          label: "None | BO NUEVO (N.O.)",
          value: 198,
        },
        {
          label: "None | PARC SINGAPOUR (N.O.)",
          value: 199,
        },
        {
          label: "None | SECTOR USERAS (N.O.)",
          value: 200,
        },
      ],
      dataTable: [],
      selectedContract: "null",
      selectedTrip: "null",
      dropdowns: "empty",
    };
  }

  setSelectedContract = (e) => {
    return this.setState({ selectedContract: e });
  };
  setSelectedTrip = (e) => {
    return this.setState({ selectedTrip: e });
  };

  componentDidMount() {
    Send.get("/contract/dropdowns/all", this.props, "").then((res) => {
      this.setState({ dropdowns: res.data });
    });
  }

  facilitySelect() {
    console.log(this.state.dropdowns[0]);
  }
  statusSelect() {}
  contractTypeSelect() {}
  companySelect() {}
  divisionCodeSelect() {}
  getSelects() {
    return this.facilitySelect(), this.statusSelect(), this.contractTypeSelect(), this.companySelect(), this.divisionCodeSelect();
    // <div>Content: {this.state.dropdowns !== "empty" && this.state.dropdowns.map((data, index) => ("Content: ", data.column_name))} </div>;
  }
  //   contractData.map((item, index) => {
  //     return getSelectOptions.push({
  //       label: item.external_contract_code,
  //       value: item.contract_id,
  //     });
  //   });
  //   this.setState({ selectOptions: getSelectOptions });

  render() {
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="12" md="12" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <MDBCardHeader>
              <div className="admin-up">
                <MDBIcon icon="file-signature" className="primary-color" />
              </div>
              <h1 className="m-3 text-center">Contract Analytics</h1>
            </MDBCardHeader>
          </MDBCard>
          <BidAnalytics />
          <div> Search Options</div>
          <Select autoFocus options={this.state.selectOptions} isMulti placeholder={"Search for Facility name"} />
          <Select autoFocus options={this.state.dropdowns[1].options} isMulti placeholder={"Search for status"} />
          <Select autoFocus options={this.state.dropdowns[2].options} isMulti placeholder={"Search for Contract Type"} />
          <Select autoFocus options={this.state.dropdowns[3].options} isMulti placeholder={"Search for Company name"} />
          {this.facilitySelect()}
          <MDBDataTable striped bordered hover responsive data={this.state.dataTable} />
        </MDBCol>
      </MDBRow>
    );
  }
}

export default BidDashboard;
