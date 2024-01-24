import "./waves.css";
import wave from "../../assets/test.svg";

function Waves() {
  return (
    <>
      {/*Hey! This is the original version
of Simple CSS Waves*/}
      <div className="header">
        {/*Content before waves*/}
        <div className="inner-header flex-class">
          {/*Just the logo.. Don't mind this*/}
          <h1>Red Fish</h1>
          <svg
            version="1.1"
            className="logo"
            baseProfile="tiny"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 500 500"
            xmlSpace="preserve"
          >
            <>
              <text
                x="3.6602521"
                y="116.60663"
                className="heavy"
                fill="#ffffff"
                id="text2"
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontSize: 150,
                  lineHeight: "normal",
                  fontFamily: "sans-serif",
                  strokeWidth: "1.53727",
                }}
                transform="scale(0.65050202,1.5372743)"
              >
                {"{"}
              </text>
              <text
                x="480.83539"
                y="116.84026"
                className="heavy"
                fill="#ffffff"
                id="text3"
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontSize: 150,
                  lineHeight: "normal",
                  fontFamily: "sans-serif",
                  strokeWidth: "1.52864",
                }}
                transform="scale(0.65417845,1.5286349)"
              >
                {"}"}
              </text>

              <g transform="matrix(0.11577961,0,0,-0.19649547,-369.70371,352.38371)" fill="#000000" stroke="none" id="g3">
                <g transform="matrix(0.86312414,0,0,0.85853802,3421.1671,586.03011)" fill="#000000" stroke="none" id="g3-0">
                  <path
                    d="M 985,1320 C 802,1300 578,1211 406,1088 297,1012 110,828 110,799 110,749 252,571 341,510 l 34,-23 -31,34 C 300,568 238,664 203,734 l -28,58 67,62 c 120,112 309,228 449,276 l 67,23 33,-38 C 899,993 979,806 955,732 952,720 918,691 880,666 798,612 655,493 585,421 l -49,-51 22,-45 c 35,-72 97,-152 162,-210 23,-21 29,-23 19,-9 -7,12 -47,70 -87,128 -39,59 -72,111 -72,116 0,13 121,118 213,184 104,74 215,136 245,136 35,0 78,-35 122,-100 50,-73 77,-142 100,-250 l 18,-85 1,101 c 1,118 -21,219 -69,314 -17,34 -29,64 -27,66 11,11 131,24 220,24 272,0 596,-130 854,-341 39,-32 74,-59 77,-59 3,0 36,31 74,68 85,84 181,137 276,152 38,6 71,8 74,6 3,-3 -7,-23 -21,-43 -41,-59 -65,-123 -71,-188 -6,-59 -6,-59 8,-25 33,86 69,140 126,193 34,32 75,64 91,72 16,9 29,19 29,24 0,15 -143,22 -221,11 -126,-18 -236,-62 -317,-127 -42,-34 -43,-34 -65,-16 -13,10 -69,53 -125,95 -358,271 -726,340 -1104,208 -94,-33 -96,-32 -97,48 -2,100 -64,304 -100,326 -6,4 -11,13 -11,21 0,41 347,26 515,-23 223,-65 432,-172 632,-324 l 72,-55 83,82 c 87,85 142,121 236,155 66,24 182,41 182,28 0,-6 -16,-29 -35,-52 -19,-23 -48,-71 -64,-107 -32,-69 -52,-167 -32,-155 6,4 11,14 11,23 0,59 145,227 243,283 31,17 57,35 57,40 0,14 -44,21 -170,27 -185,8 -305,-27 -461,-134 l -68,-46 -103,76 c -270,199 -520,308 -773,337 -99,11 -117,11 -220,0 z"
                    id="path1-5"
                    style={{ fill: "#e0484d", fillOpacity: 1 }}
                  >
                    <path
                      d="m 533,950 c -35,-14 -46,-45 -29,-79 24,-45 63,-54 96,-21 49,49 -2,126 -67,100 z"
                      id="path2-2"
                      style={{ fill: "#e0484d", fillOpacity: 1 }}
                    >
                      <path
                        d="m 902,497 c -38,-40 -23,-90 30,-102 21,-5 33,-1 52,19 31,31 32,45 5,80 -25,32 -59,33 -87,3 z"
                        id="path3-2"
                        style={{ fill: "#e0484d", fillOpacity: 1 }}
                      ></path>
                    </path>
                  </path>
                </g>
              </g>
            </>
          </svg>
          <h1>Blue Fish</h1>
        </div>
        {/*Waves Container*/}
        <div className="z-50">
          {/* <object src={wave}></object> */}
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(255,255,255,0.7)" />
              <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
            </g>
          </svg>
        </div>
        {/*Waves end*/}
      </div>
      {/*Header ends*/}
      {/*Content starts*/}
      <div className="content flex-class">
        <p>Ian Hrydziuszko|&nbsp; &#169; {new Date().getFullYear()} </p>
      </div>
      {/*Content ends*/}
    </>
  );
}

export default Waves;
