// // Copyright (c) 2014-2021 Walter Bender
// //
// // This program is free software; you can redistribute it and/or
// // modify it under the terms of the The GNU Affero General Public
// // License as published by the Free Software Foundation; either
// // version 3 of the License, or (at your option) any later version.
// //
// // You should have received a copy of the GNU Affero General Public
// // License along with this library; if not, write to the Free Software
// // Foundation, 51 Franklin Street, Suite 500 Boston, MA 02110-1335 USA

// // This header is prepended to the Lilypond output.
const LILYPONDHEADER =
    '\\version "2.18.2"\n\n% ****************************************************************\n% \n% WHAT IS THIS? -- This is a LilyPond file generated from Music\n% Blocks software (Read about it at www.musicblocks.net).\n% \n% DOWNLOAD LILYPOND -- In order to create notation with this file,\n% you will need to download and install LilyPond software onto your\n% computer (http://lilypond.org/download.html). Frescobaldi\n% software is also handy for editing LilyPond files\n% (http://frescobaldi.org/download).\n% \n% LILYPOND INSTRUCTIONS -- For instructions on how to further\n% manipulate musical notation using LilyPond software, please\n% read the Introduction (http://lilypond.org/text-input.html) and\n% the Manual\n% (http://lilypond.org/doc/v2.18/Documentation/learning/index.html).\n% \n% GLOSSARY -- A glossary with helpful examples may be found here\n% (http://www.lilypond.org/doc/v2.19/Documentation/music-glossary/).\n% \n% MUTOPIA -- You may also benefit from studying scores from the\n% Mutopia Project website, which has freely sharable music notation\n% generated with LilyPond (http://www.mutopiaproject.org/).\n% \n% HACKLILY / LILYBIN -- You can explore your Lilypond output in a web browser\n% at (http://hacklily.org/) or (http://lilybin.com/).\n% \n% COMMENTS -- Some of the code below is commented out. You can\n% enable it by deleting the % that precedes the text or, in the\n% case of a commented section, deleting the %{ and %} that surrounds\n% the section.\n% \n% ****************************************************************\n\n% Please add your own name, the title of your musical creation,\n% and the intended copyright below.\n% The copyright is great for sharing (and re-sharing)!\n% Read more about it here (http://creativecommons.org/licenses/by-sa/4.0/).\n% Of course, you can use any copyright you like -- you made it!\n\\header {\n   dedication = \\markup {\n      \\abs-fontsize #8 \\sans "Made with LilyPond and Music Blocks" \\with-url #"http://musicblocks.sugarlabs.org/" {\n         \\abs-fontsize #8 \\sans "(http://musicblocks.sugarlabs.org/)"\n      }\n   }\n   title = "My Music Blocks Creation"\n%   subtitle = "Subtitle"\n%   instrument = "Instrument"\n   composer = "Mr. Mouse"\n%   arranger = "Arranger"\n   copyright = "Mr. Mouse (c) 2020 -- CC-BY-SA"\n   tagline = "Made from Music Blocks v.2.2"\n   footer = \\markup {\n      \\with-url #"http://musicblocks.sugarlabs.org/" "Made with Music Blocks Software v.2.2" Engraved on \\simple #(strftime "%Y-%m-%d" (localtime (current-time)))\n   }\n   currentYear = \\markup {\n      \\simple #(strftime "%Y" (localtime (current-time)))\n   }\n   copyTag =  " free to distribute, modify, and perform"\n   copyType = \\markup {\n      \\with-url #"http://creativecommons.org/licenses/by-sa/3.0/" "Creative Commons Attribution ShareAlike 3.0 (Unported) License "\n   }\n   copyright = \\markup {\n      \\override #\'(baseline-skip . 0 ) \\right-column {\n         \\sans \\bold \\with-url #"http://musicblocks.net" {\n            \\abs-fontsize #9  "Music " \\concat {\n               \\abs-fontsize #12 \\with-color #white \\char ##x01C0 \\abs-fontsize #9 "Blocks "\n            }\n         }\n      }\n      \\override #\'(baseline-skip . 0 ) \\center-column {\n         \\abs-fontsize #11.9 \\with-color #grey \\bold {\n            \\char ##x01C0 \\char ##x01C0\n         }\n      }\n      \\override #\'(baseline-skip . 0 ) \\column {\n         \\abs-fontsize #8 \\sans \\concat {\n            " Typeset using " \\with-url #"http://www.lilypond.org" "LilyPond software " \\char ##x00A9 " " \\currentYear " by " \\composer " " \\char ##x2014 " " \\footer\n         }\n         \\concat {\n            \\concat {\n               \\abs-fontsize #8 \\sans {\n                  " " \\copyType \\char ##x2014 \\copyTag\n               }\n            }\n            \\abs-fontsize #13 \\with-color #white \\char ##x01C0\n         }\n      }\n   }\n   tagline = ##f\n}\n\n% To change the meter make adjustments in the following section.\n% You must also delete the % before \\meter everywhere it appears below.\nmeter = {\n%   \\time 3/4\n%   \\key c \\minor\n   \\numericTimeSignature\n%   \\partial 4 \n%   \\tempo "Andante" 4=90\n}\n\n';

// /**
//  * @deprecated
//  */
 const getLilypondHeader = function () {
    return LILYPONDHEADER;
};
    function div(a, b) {
        return a / b;
    }
    function increment(j) {
        return j+1;
    }
    function toFraction(d) {
        // Convert float to its approximate fractional representation.
        let flip = false;
        if (d > 1) {
            flip = true;
            d = 1 / d;
        }
    
        let df = 1.0;
        let top = 1;
        let bot = 1;
    
        while (Math.abs(df - d) >= 0.00000001) {
            if (df < d) {
                top += 1;
            } else {
                bot += 1;
                top = parseInt(d * bot);
            }
            df = top / bot;
        }
    
        if (flip) {
            const tmp = top;
            top = bot;
            bot = tmp;
        }
    
        return [top, bot];
    }

    function computeModeDef(mode, obj, lilypond, logo, turtle, key) {
        let modeDef = getModeDef(mode);
        let prevNote = getEmptyString();
        let n, nn = -1;
        for (let ii = 0; ii < obj[1].length; ii++) {
            if (obj[1][ii] !== getEmptyString()) {
                if (obj[0][ii].substr(0, 1) === prevNote) {
                    modeDef = getEmptyString();
                    break;
                }
                scale = getExtendedScale()
                n = scale.indexOf(
                    obj[0][ii].substr(0, 1)
                );
                if (n > nn) {
                    // if (n - nn > 1) {
                    for (let j = nn + 1; j < n; j++) {
                        modeDef += "(" + j + " . ,NATURAL) ";
                    }
                    // }
                    nn = n;
                    if (obj[0][ii].length === 1) {
                        modeDef += "(" + n + " . ,NATURAL) ";
                    } else {
                        if (obj[0][ii].substr(1, 1) === "♭") {
                            modeDef += "(" + n + " . ,FLAT) ";
                        } else {
                            modeDef += "(" + n + " . ,SHARP) ";
                        }
                    }
                }
            }
        }
        if (modeDef !== getEmptyString()) {
            // if (n < 6) {
            for (let j = n + 1; j < 7; j++) {
                modeDef += "(" + j + " . ,NATURAL) ";
            }
            // }

            modeDef += ")\n";
            // console.debug(modeDef);
            lilypond.freygish += modeDef;
            logo.notationNotes[turtle] +=
                " \\key " + key + " \\" + mode.replace(/ /g, "_") + "\n";
        }
        return modeDef
    }

    function __toLilynote(note) {
        // Lilypond notes use is for sharp, es for flat,
        // , and ' for shifts in octave.
        // Also, notes must be lowercase.
        // And the octave bounday is at C, not A.

        // Convert frequencies here.
        if (typeof note === "number" || typeof note == "object") {
            const pitchObj = ["''", "'''"]
            // frequencyToPitch(note);
            note = pitchObj[0] + pitchObj[1];
        }

        return note
            .replace(/♮/g, "!")
            .replace(/♯/g, "is")
            .replace(/♭/g, "es")
            .replace(/10/g, "''''''''")
            .replace(/1/g, ",, ")
            .replace(/2/g, ", ")
            .replace(/3/g, "")
            .replace(/4/g, "'")
            .replace(/5/g, "''")
            .replace(/6/g, "'''")
            .replace(/7/g, "''''")
            .replace(/8/g, "''''''")
            .replace(/9/g, "'''''''")
            .toLowerCase();
    }
    function getTupletDuration() { return 2*10; }
    function __processTuplet(logo, turtle, i, count, nextObj, notes) {
        let j = 0;
        let k = 0;
        let ii;

        while (k < count) {
            tupletDuration = getTupletDuration();
            // logo.notation.notationStaging[turtle][i + j][NOTATIONDURATION];

            // notes = logo.notation.notationStaging[turtle][i + j][NOTATIONNOTE];
            if (typeof notes === "object") {
                if (notes.length > 1) {
                    logo.notationNotes[turtle] += "<";
                }
                for (ii = 0; ii < notes.length; ii++) {
                    logo.notationNotes[turtle] += __toLilynote(notes[ii]);
                    if (notes.length === 1 || ii < notes.length - 1) {
                        logo.notationNotes[turtle] += " ";
                    }
                }
                if (notes[6]) {
                    logo.notationNotes[turtle] += " \\staccato ";
                }
                if (notes.length > 1) {
                    logo.notationNotes[turtle] += ">";
                }

                logo.notationNotes[turtle] += "3"
                j++; // Jump to next note.
                k++; // Increment notes in tuplet.
            } else if (notes === "tie") {
            // else if (logo.notation.notationStaging[turtle][i + j] === "tie") {
                logo.notationNotes[turtle] += "~";
                j++; // Jump to next note.
                k++; // Increment notes in tuplet.
            } else {
                j++; // Jump to next note.
                k++; // Increment notes in tuplet.
            }
        }

        if (i + j - 1 < 10) {
            // const nextObj = logo.notation.notationStaging[turtle][i + j];
            // Workaround to a Lilypond "feature": if a slur
            // ends on a tuplet, the closing ) must be inside
            // the closing } of the tuplet. Same for markup.
            if (nextObj === ")") {
                logo.notationNotes[turtle] += ")} ";
                i += 1;
            } else if (nextObj === "markup") {
                logo.notationNotes[turtle] +=
                    "^\\markup { \\abs-fontsize #6 { " +
                    // logo.notation.notationStaging[turtle][i + j + 1] +
                    " } } } ";
                j += 2;
            } else if (nextObj === "markdown") {
                logo.notationNotes[turtle] +=
                    "_\\markup {" 
                    // + logo.notation.notationStaging[turtle][i + j + 1] 
                    + "} } ";
                j += 2;
            } else {
                logo.notationNotes[turtle] += "} ";
            }
        } else {
            logo.notationNotes[turtle] += "} ";
        }

        return j;
    }

    function findKeySignature() {
        return "FLAT" + 
                " " +
                "SHARP";
    }
    function getStringArr() {
        return ["0", "1", "2", "3"]
    }
    function computeCounter(tupletNoteCounter, x) {
        if (x > 5) {
            f = div(x, 5)
            tupletNoteCounter *= f;
            tupletNoteCounter += 1;
            // break
        } else if (x < 5) { // EQUIVALENT MUTANT GENERATED FOR THIS
            f = div(5, x)
            tupletNoteCounter += f;
        } else {
            tupletNoteCounter += 1;
        }
        return tupletNoteCounter
    }

    function getScale() {
        return ["C", "D", "E", "F", "G", "A", "B"];
    }
    function getExtendedScale() {
        scale = getScale()
        l = scale.length;
        for (var idx = 0; idx < l; idx++) {
            scale.push(scale[idx] + "♭")
            scale.push(scale[idx] + "♯")
        }
        return scale;
    }
    function getEmptyString() {
        return "";
    }
    function getEmptyList() {
        return [];
    }
    function getArr() {
        return [0,0];
    }
    function getSong() {
        return ["do", "re", "mi", "fa", "sol", "la", "ti"]
    }
    function getObj() {
        return [getScale(), getSong(), "C", "major"]
    }
    function getModeDef(mode) {
        return "\n" + mode.replace(/ /g, "_") + " = #`(";
    }
    function processLilypondNotes(lilypond, logo, turtle, obj, flag, mode, arr=getArr(), word=getEmptyString(), isComplete=true) {
        // obj = [instructions] or
        // obj = [note, duration, dotCount, tupletValue, roundDown, insideChord, staccato]

        logo.notationNotes[turtle] = "\\meter\n";

        let queueSlur = false;
        let articulation = false;
        let targetDuration = 0;
        let tupletDuration = 0;
        let multivoice = false;
        let keySignature;
        let key;
        // let mode;
        // let obj;
        let note;
        let notes;
        // print(logo.notation)
        if (flag) {
            for (let i = 0; i < 3; i++) {
                // let obj = logo.notation.notationStaging[turtle][i];
                if (typeof obj === "string") {
                    switch (obj) {
                        case "swing":
                            logo.notationNotes[turtle] += "\\tempo swing\n";
                            break;
                        case "tempo":
                            logo.notationNotes[turtle] +=
                                "\\tempo " +
                                "3" +
                                // logo.notation.notationStaging[turtle][i + 2] +
                                " = " +
                                "6" +
                                // logo.notation.notationStaging[turtle][i + 1] +
                                "\n";
                            i += 2;
                            break;
                        case "markup":
                            logo.notationNotes[turtle] +=
                                "^\\markup { \\abs-fontsize #6 { " +
                                "6" +
                                // logo.notation.notationStaging[turtle][i + 1] +
                                " } } ";
                            i += 1;
                            break;
                        case "markdown":
                            logo.notationNotes[turtle] +=
                                "_\\markup { " + "6"
                                // logo.notation.notationStaging[turtle][i + 1] 
                                + " } ";
                            i += 1;
                            break;
                        case "break":
                            if (i > 0) {
                                logo.notationNotes[turtle] += "\n";
                            }
                            break;
                        case "begin articulation":
                            articulation = true;
                            break;
                        case "end articulation":
                            articulation = false;
                            break;
                        case "begin crescendo":
                            logo.notationNotes[turtle] += "\\< ";
                            break;
                        case "begin decrescendo":
                            logo.notationNotes[turtle] += "\\> ";
                            break;
                        case "end crescendo":
                            logo.notationNotes[turtle] += "\\? ";
                            break;
                        case "end decrescendo":
                            logo.notationNotes[turtle] += "\\! ";
                            break;
                        case "begin slur":
                            // The ( is added after the first note.
                            queueSlur = true;
                            break;
                        case "end slur":
                            logo.notationNotes[turtle] += ")  ";
                            break;
                        case "begin harmonics":
                            logo.notationNotes[turtle] += "\\harmonicsOn ";
                            break;
                        case "end harmonics":
                            logo.notationNotes[turtle] += "\\harmonicsOff ";
                            break;
                        case "tie":
                            logo.notationNotes[turtle] += "~";
                            break;
                        case "key":
                            keySignature = findKeySignature();
                            key = "♭𝄪♯♮𝄫"
                                .toLowerCase()
                                .replace("♭", "es") // check macro FLAT
                                .replace("♯", "is")
                                .replace("♮", "")
                                .replace("𝄪", "isis")
                                .replace("𝄫", "eses");
                            // mode = logo.notation.notationStaging[turtle][i + 2];
                            // Lilypond knows about common modes.
                            if (["major", "minor", "ionian", "dorian", "phrygian","lydian", "mixolydian","aeolian", "locrian"].indexOf(mode) !== -1)
                            {
                                logo.notationNotes[turtle] += "\\key " + key + " \\" + mode + "\n";
                            } 
                            else {
                                obj = getObj(); 
                                let modeDef = computeModeDef(mode, obj, lilypond, logo, turtle, key)
                            }
                            i += 2;
                            break;
                        case "meter":
                            logo.notationNotes[turtle] +=
                                " \\time " +
                                "3" + 
                                // logo.notation.notationStaging[turtle][i + 1] +
                                "/" + "4" +
                                // logo.notation.notationStaging[turtle][i + 2] +
                                "\n";
                            i += 2;
                            break;
                        case "pickup":
                            logo.notationNotes[turtle] +=
                                " \\partial " + "3" + "\n";
                            i += 1;
                            break;
                        case "voice one":
                            if (multivoice) {
                                logo.notationNotes[turtle] += "}\n\\new Voice { \\voiceOne ";
                            } else {
                                logo.notationNotes[turtle] += "<< { \\voiceOne ";
                                multivoice = true;
                            }
                            break;
                        case "voice two":
                            if (multivoice) {
                                logo.notationNotes[turtle] += "}\n\\new Voice { \\voiceTwo ";
                            } else {
                                logo.notationNotes[turtle] += "<< { \\voiceTwo ";
                                multivoice = true;
                            }
                            break;
                        case "voice three":
                            if (multivoice) {
                                logo.notationNotes[turtle] += "}\n\\new Voice { \\voiceThree ";
                            } else {
                                logo.notationNotes[turtle] += "<< { \\voiceThree ";
                                multivoice = true;
                            }
                            break;
                        case "voice four":
                            if (multivoice) {
                                logo.notationNotes[turtle] += "}\n\\new Voice { \\voiceFour ";
                            } else {
                                logo.notationNotes[turtle] += "<< { \\voiceFour ";
                                multivoice = true;
                            }
                            break;
                        case "one voice":
                            logo.notationNotes[turtle] += "}\n>> \\oneVoice\n";
                            break;
                        default:
                            logo.notationNotes[turtle] += obj;
                            break;
                    }
                } 
                else if (typeof obj === "number") {
                    // logo.notationNotes[turtle] = "gayugayu"
                    throw new Error("Obj should be a string or an array");
                }
                else {
                    notes = obj[0];
                    note = __toLilynote(notes);  // 
                    
                    /* eslint-enable no-unused-vars */

                    let incompleteTuplet = 0; // An incomplete tuplet
                    let totalTupletDuration = 0;
                    let commonTupletNote = 1;
                    let tupletNoteCounter = 1;

                    // If it is a tuplet, look ahead to see if it is complete.
                    // While you are at it, add up the durations.
                    if (arr[0] != null) {
                        let f;
                        targetDuration = 1 / 2.0;
                        tupletDuration = 1 / 2.0;
                        totalTupletDuration = (isComplete) ? 1 / (2 * 4)
                            : -1;

                        if (arr[0] > commonTupletNote) {
                            f = div(arr[0], commonTupletNote)
                            commonTupletNote = arr[0];
                            tupletNoteCounter *= f;
                            tupletNoteCounter += 1;
                        }

                        let j = 1;
                        let k = 1;
                        while (k < arr[0] * arr[1]) {
                            if (word[3] === "tie") {
                                // console.debug("saw a tie");
                                k = increment(k); // Increment notes in tuplet.
                                j = increment(j);
                            } 
                            else if ([1, 0.5, 0.25, 0.125, 0.0625].indexOf(totalTupletDuration) !== -1) {
                                // Break up tuplet on POW2 values
                                incompleteTuplet = j;
                                break;
                            } else if (word[3] === null) {
                                incompleteTuplet = j;
                                break;
                            } 
                            else if (word[3][0] !== arr[0]) {
                                // Match if sharing same factor, e.g., 1/3, 1/6, 1/12
                                incompleteTuplet = j;
                                break;
                            } 
                            else {
                                tupletNoteCounter = computeCounter(tupletNoteCounter, word[4])
                                if (word[4] > 5) { break; }
                                targetDuration +=
                                    div(1, word[1]);
                                tupletDuration +=
                                    div(1, word[4]);
                                totalTupletDuration +=
                                    div(1, (div(word[3][0], div(1, word[3][1]))));
                                j = increment(j); // Jump to next note.
                                k = increment(k); // Increment notes in tuplet.
                                // incompleteTuplet = 0
                            }

                            // else { 
                            //     incompleteTuplet = computeIncomplete(totalTupletDuration, word, arr, j); 
                            // }
                                
                            // if (incompleteTuplet != null) { 
                            //     break;
                            // }
                            // else {
                            //     tupletNoteCounter = computeCounter(tupletNoteCounter, word[4])
                            //     if (word[4] > 5) { break; }
                            //     targetDuration +=
                            //         div(1, word[1]);
                            //     tupletDuration +=
                            //         div(1, word[4]);
                            //     totalTupletDuration +=
                            //         div(1, (div(word[3][0], div(1, word[3][1]))));
                            //     j = increment(j); // Jump to next note.
                            //     k = increment(k); // Increment notes in tuplet.
                            //     incompleteTuplet = 0
                            // }
                        }
                    }
                

                    if (
                        arr[0] != null &&
                        arr[0] * arr[1] > 0
                    ) {
                        // Lilypond tuplets look like this: \tuplet 3/2 { f8 g a }
                        // multiplier = tupletDuration / targetDuration
                        // e.g., (3/8) / (1/4) = (3/8) * 4 = 12/8 = 3/2

                        if (incompleteTuplet === 0) {
                            const tupletFraction = toFraction(div(tupletDuration, targetDuration));
                            let a = tupletFraction[0] * targetDuration;
                            let b = div(tupletFraction[0], div(1, tupletFraction[1]));
                            let c;

                            if (Math.floor(a) !== a) {
                                c = toFraction(div(a, 1));
                                a = c[0];
                                b = c[1];
                            }

                            logo.notationNotes[turtle] += "\\tuplet " + a + "/" + b + " { ";

                            i +=
                                __processTuplet(
                                    logo,
                                    turtle,
                                    i,
                                    arr[0] * arr[1]
                                ) - 1;
                        } else {
                            // Incomplete tuplets look like this: \tuplet 3/2 { f4 a8 }
                            // for 1/6 1/12
                            // duration = 1/6 + 1/12 ==> 1/4
                            // 3 x 1/8 note in the time of a 1/4 note ==>
                            // 3/8 / 1/4 = 3/2

                            const f = tupletNoteCounter / commonTupletNote / totalTupletDuration;
                            const tupletFraction = toFraction(f);
                            let a = tupletFraction[0];
                            let b = tupletFraction[1];
                            let c;
                            if (Math.floor(a) !== a) {
                                c = toFraction(div(a, 1));
                                a = c[0];
                                b = c[1];
                            }

                            logo.notationNotes[turtle] += "\\tuple " + a + "/" + b + " { ";

                            i += __processTuplet(logo, turtle, i, incompleteTuplet) - 1;
                        }

                        targetDuration = 0;
                        tupletDuration = 0;
                    } else {
                        if (typeof notes === "object") {
                            if (notes.length > 1) {
                                logo.notationNotes[turtle] += "< note ";
                            }

                            for (let ii = 0; ii < notes.length; ii++) {
                                logo.notationNotes[turtle] += __toLilynote(notes[ii]);
                                if (ii < notes.length - 1) {
                                    logo.notationNotes[turtle] += " ";
                                }
                            }

                            if (notes.length > 1) {
                                logo.notationNotes[turtle] += ">";
                            }

                            logo.notationNotes[turtle] += obj[1];
                            for (let d = 0; d < obj[1]; d++) {
                                logo.notationNotes[turtle] += ".";
                            }

                        }
                        logo.notationNotes[turtle] += " ";

                        if (arr[1] == 3) {
                            logo.notationNotes[turtle] += "\\staccato ";
                        }

                        targetDuration = 0;
                        tupletDuration = 0;
                    }
                }
                if (articulation) {
                    logo.notationNotes[turtle] += "->";
                }
                if (queueSlur) {
                    queueSlur = false;
                    logo.notationNotes[turtle] += "(  ";
                }
                // }
            }
        }
    };

    function computeFoundNotes(obj) {
        let foundNotes = false;
        if (typeof obj === "object" && typeof obj[0] === "object" && obj[0][0] !== "R") {
            foundNotes = true;
        }
        return foundNotes;
    }

    function funcNum(t){
        if (typeof t === "string") {
            return Number(t);
        }
        return t;
    }

    function greaterThan(a,b){
        if(a>b){
            return 1;
        }
        return 0;
    }

    function getRodents(){
        return [
            ("mouse"),
            ("brown rat"),
            ("mole"),
            ("chipmunk"),
            ("red squirrel"),
            ("guinea pig"),
            ("capybara"),
            ("coypu"),
            ("black rat"),
            ("grey squirrel"),
            ("flying squirrel"),
            ("bat")
        ];
    }

    function getClefs(){
        return ["treble", "bass", "bass_8", "percussion"];
    }

    function getNumberNames(){
        return [
            "zero",
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine"
        ];
    }

    function retEmpty(){
        return "";
    }
    function replace_instr(instrumentName) {
        instrumentName = instrumentName.replace(/ /g, "").replace(".", "")
        return instrumentName;
    }
    function combine(instrumentName) {
        return '" \\' +
                    replace_instr(instrumentName) +
                "\n";
    }

    function combine2(instrumentName) {
        return "      \\" 
            + instrumentName
            + "Voice\n";
    }

    function helperInstrument(instrumentName, RODENTS, tNumber) {
        if (instrumentName === "") {
            instrumentName = "mouse";
        }

        if (instrumentName === "start" || instrumentName === "start drum") {
            instrumentName = RODENTS[2];
        } else if (instrumentName == tNumber.toString()) {
            instrumentName = RODENTS[3];
        }
        return instrumentName
    }

    function instrument(t, arr, activity, clef, startDrums, s) {
        if (t in arr) {
            // const turtleNumber = tNumber;
            instrumentName = computeInstrument(activity, clef, startDrums, s, t);
        }
        instrumentName = replace_instr(instrumentName);
        return instrumentName;
    }

    function computeInstrument(activity, clef, startDrums, arr, instrumentName="") {
        let CLEFS = getClefs()
        let RODENTS = getRodents()
        for (let c = 0; c < getClefs().length; c++) {
            // let instrumentName;
            for (let t in getStringArr().slice(1, 5)) {
                let tNumber = funcNum(t);
                if (clef[tNumber] === CLEFS[c]) {
                    // if (activity.logo.notation.notationStaging[t].length > 0) {
                        if (greaterThan(tNumber,startDrums-1)) {
                            instrumentName = "drum";
                        } else {
                        
                            instrumentName = helperInstrument(instrumentName, RODENTS, tNumber)
                        }
                        instrumentName = replace_instr(instrumentName);
                        activity.logo.notationOutput += combine2(instrumentName);

                        activity.logo.notationOutput +=
                            '         \\context TabVoice = "' +
                            instrumentName +
                            combine(instrumentName)
                        
                    }
                // }
            }
        }
        return instrumentName
    }

    function findClef(clef, val=0, tNumber=0, startDrums=0, noteCount=0, flag=true) {
        if (!flag) {
            clef.push(getEmptyString())
            return clef;
        }
        if (greaterThan(tNumber,startDrums - 1)) {
            clef.push("percussion");
        } else if (greaterThan(noteCount, 0)) {
            // eslint-disable-next-line no-console
            // console.debug(
            //     octaveTotal + " " + noteCount + " " + Math.floor(0.5 + octaveTotal / noteCount)
            // );
            switch (Math.floor(0.5 + val)) {
                case 0:
                case 1:
                case 2:
                    clef.push("bass_8");
                    break;
                case 3:
                    clef.push("bass");
                    break;
                default:
                    clef.push("treble");
                    break;
            }
        } else {
            clef.push("treble");
        }
        return clef
    }

    function get_temparr() {
        return [[1],[2],[3],[4],[5]]
    }

    function getOctaveTotal(arr) {
        let octaveTotal = 0
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            if (typeof obj === "object") {
                for (let ii = 0; ii < obj[0].length; ii++) {
                    if (obj[0][ii] === "R") {
                    } else if (typeof obj[0][ii] === "string") {
                        octaveTotal += Number(obj[0][ii].substr(-1));
                    } else {
                        const pitchObj = toFraction(Number(obj[0][ii]));
                        octaveTotal += pitchObj[0];
                    }
                }
            }
        }
        return octaveTotal;
    }

    function add(a, b) {
        return a + b;
    }

    function getNoteCount(arr) {
        let noteCount = 0
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            if (typeof obj === "object") {
                for (let ii = 0; ii < obj[0].length; ii++) {
                    if (obj[0][ii] === "R") {
                        continue;
                    }
                    noteCount = add(1, noteCount);
                }
            }
        }
        return noteCount;
    }

    function getDrum() {
        return "drum"
    }

    const saveLilypondOutput = function (activity, instrumentName=getEmptyString(), temp_arr=get_temparr(), arr=getArr(), startDrums=0, turtleCount=0) {

        //.TRANS Animal names used in Lilypond output
        const RODENTS = getRodents();
        const CLEFS = getClefs();
        const NUMBERNAMES = getNumberNames();
        
        // let turtleCount = 0;
        let clef = getEmptyList(); // eslint-disable-next-line no-unused-vars
        const freygish = getEmptyString(); // A place to store custom mode definitions

        turtleCount = add(turtleCount, 5)
        // Object.keys(activity.logo.notation.notationStaging).length;

        // const startDrums = turtleCount;

        // eslint-disable-next-line no-console

        activity.logo.notationOutput +=
            "% You can change the MIDI instruments below to anything on this list:\n% (http://lilypond.org/doc/v2.18/documentation/notation/midi-instruments)\n\n";

        let c = 0;
        
        let occupiedShortNames = getEmptyList();
        // for (const t in activity.logo.notation.notationStaging) {
            for (const t in [0,1,2,3,4]) {
            // console.debug('value of t: ' + t);
            let tNumber = funcNum(t);
            if (temp_arr[t].length > 0) {
                let octaveTotal = 0;
                let noteCount = 0;
                noteCount = getNoteCount(temp_arr[t])
                octaveTotal = getOctaveTotal(temp_arr[t])

                clef = findClef(clef, div(octaveTotal, noteCount), tNumber, startDrums, 5)

                this.freygish = getEmptyString();
                processLilypondNotes(this, activity.logo, t);

                // let instrumentName = "";
                let shortInstrumentName = getEmptyString()

                if (greaterThan(tNumber,startDrums-1)) {
                    instrumentName = getDrum();
                    instrumentName = replace_instr(instrumentName);
                    activity.logo.notationOutput += instrumentName + " = {\n";
                    activity.logo.notationOutput += "\\drummode {\n";
                    activity.logo.notationOutput += activity.logo.notationNotes[t];
                    // Add bar to last turtle's output.
                    if (c === turtleCount - 1) {
                        activity.logo.notationOutput += ' \\bar "|."';
                    }

                    activity.logo.notationOutput += "\n}\n";
                    activity.logo.notationOutput += "\n}\n\n";
                } else {
                    // if (t in arr) {
                    //     // const turtleNumber = tNumber;
                    //     instrumentName = computeInstrument(activity, clef, startDrums, getStringArr(), t);
                    // }

                    // instrumentName = replace_instr(instrumentName);

                    instrumentName = instrument(t, arr, activity, clef, startDrums, getStringArr())

                    // console.log("L604: " + instrumentName);
                    activity.logo.notationOutput += instrumentName + " = {\n";
                    activity.logo.notationOutput += activity.logo.notationNotes[t];

                    // Add bar to last turtle's output.
                    if (c === turtleCount - 1) {
                        activity.logo.notationOutput += ' \\bar "|."';
                    }

                    activity.logo.notationOutput += "\n}\n\n";

                    // let final = retEmpty();
                    // let firstPart = retEmpty();
                    // let secondPart = retEmpty();
                    // let part1 = retEmpty();
                    // let part2 = retEmpty();
                    // let done = 0;
                    // const n = instrumentName.indexOf("_");

                    // We calculate a unique short name based on the
                    // initial characters of the long name. If there is a
                    // space in the name, we use the first letter of each
                    // word. Otherwise we use the first two letters of the
                    // name. If the name is not unique, we keep adding
                    // letters.

                    let temp = shortNames(instrumentName, occupiedShortNames, shortInstrumentName, t)
                    occupiedShortNames = temp[0]
                    shortInstrumentName = temp[1]
                    // if (instrumentName.length === 1) {
                    //     shortInstrumentName = instrumentName;
                    //     occupiedShortNames[t] = shortInstrumentName;
                    // } else if (n === -1) {
                    //     // no space in instrument name
                    //     for (let p = 2; p < instrumentName.length; p++) {
                    //         if (p === 2) {
                    //             final = instrumentName.slice(0, 2);
                    //         } else {
                    //             final = add(final, instrumentName.charAt(p - 1));
                    //         }

                    //         if (occupiedShortNames.indexOf(final) === -1) {
                    //             // not found in array so unique shortname
                    //             shortInstrumentName = final;
                    //             occupiedShortNames[t] = shortInstrumentName;
                    //             break;
                    //         }
                    //     }
                    // } else {
                    //     // at least 1 space in instrument name
                    //     firstPart = instrumentName.slice(0, n);
                    //     secondPart = instrumentName.slice(add(n, 1), instrumentName.length);
                    //     part1 = firstPart.charAt(0);
                    //     part2 = secondPart.charAt(0);

                    //     occupiedShortNames = occupied(part1, part2, instrumentName, occupiedShortNames, shortInstrumentName, t)
                    //     shortInstrumentName = short(part1, part2, instrumentName, occupiedShortNames, shortInstrumentName);
                    // }

                    // console.debug("instrumentName: " + instrumentName);
                    // console.debug("shortInstrumentName: " + shortInstrumentName);
                }

                activity.logo.notationOutput += replace_instr(instrumentName) + "Voice = ";
                if (greaterThan(tNumber,startDrums-1)) {
                    activity.logo.notationOutput += "\\new DrumStaff \\with {\n";
                } else {
                    activity.logo.notationOutput += "\\new Staff \\with {\n";
                }
                activity.logo.notationOutput += '   \\clef "' + clef[0] + '"\n';
                activity.logo.notationOutput += '   instrumentName = "' + instrumentName + '"\n';
                if (greaterThan(tNumber,startDrums-1)) {
                    const num = tNumber - startDrums;
                    // console.debug("shortInstrumentName = d" + num);
                    activity.logo.notationOutput += '   shortInstrumentName = "' + "d" + num + '"\n';
                    activity.logo.notationOutput += '   midiInstrument = "snare drum"\n';
                } else {
                    activity.logo.notationOutput += '   shortInstrumentName = "' + shortInstrumentName + '"\n';
                    activity.logo.notationOutput += '   midiInstrument = "acoustic grand"\n';
                }
                // Automatic note splitting
                // activity.logo.notationOutput += '\n   \\remove "Note_heads_engraver"\n   \\consists "Completion_heads_engraver"\n   \\remove "Rest_engraver"\n   \\consists "Completion_rest_engraver"\n'
                clef = findClef(clef, div(octaveTotal, noteCount), tNumber, startDrums, 5)
                activity.logo.notationOutput +=
                    '\n} { \\clef "' +
                    clef[0] +
                    '" \\' +
                    replace_instr(instrumentName) +
                    " }\n\n";
            } else {
                clef = findClef(clef, flag=false);
            }

            c = add(c, 1);
        }

        // Begin the SCORE section.
        activity.logo.notationOutput += "\n\\score {\n";
        activity.logo.notationOutput += "   <<\n";
        instrumentName = computeInstrument(activity, clef, startDrums, getStringArr())
        // Sort the staffs, treble on top, bass_8 on the bottom.

        // Add GUITAR TAB in comments.
        activity.logo.notationOutput += activity.logo.guitarOutputHead;           
        

        // Close the SCORE sections.
        activity.logo.notationOutput += activity.logo.guitarOutputEnd;
        activity.logo.notationOutput += "\n   >>\n   \\layout {}\n\n";

        // Add MIDI OUTPUT in comments.
        activity.logo.notationOutput += activity.logo.MIDIOutput;

        // ADD TURTLE BLOCKS CODE HERE
        activity.logo.notationOutput += "% MUSIC BLOCKS CODE\n";
        activity.logo.notationOutput +=
            "% Below is the code for the Music Blocks project that generated this Lilypond file.\n%{\n\n";
        // prepareExport() returns json-encoded project data.
        const projectData = activity.prepareExport();
        activity.logo.notationOutput += projectData.replace(/]],/g, "]],\n");
        activity.logo.notationOutput += "\n%}\n\n";
        return activity.logo.notationOutput;
    };
// }
// module.exports = Lily
// module.exports = LILYPONDHEADER
function short(part1, part2, occupiedShortNames, shortInstrumentName) {
    final = add(part1, part2);
    if (occupiedShortNames.indexOf(final) === -1) {
        // found unique shortname
        shortInstrumentName = final;
    } else {
        final = add(final, final);
        if (occupiedShortNames.indexOf(final) === -1) {
            // found unique shortname
            shortInstrumentName = final;
        }
    }
    return shortInstrumentName;
}

function occupied(part1, part2, occupiedShortNames, shortInstrumentName, t) {
    final = add(part1, part2);
    if (occupiedShortNames.indexOf(final) === -1) {
        occupiedShortNames[t] = shortInstrumentName;
    } else {
        final = add(final, final);
        if (occupiedShortNames.indexOf(final) === -1) {
            occupiedShortNames[t] = shortInstrumentName;
        }
    }
    return occupiedShortNames;
}

function shortNames(instrumentName, occupiedShortNames, shortInstrumentName, t) {
    let final = retEmpty();
    let firstPart = retEmpty();
    let secondPart = retEmpty();
    let part1 = retEmpty();
    let part2 = retEmpty();
    let done = 0;
    const n = instrumentName.indexOf("_");
    if (instrumentName.length === 1) {
        shortInstrumentName = instrumentName;
        occupiedShortNames[t] = shortInstrumentName;
    } else if (n === -1) {
        // no space in instrument name
        for (let p = 2; p < instrumentName.length; p++) {
            if (p === 2) {
                final = instrumentName.slice(0, 2);
            } else {
                final = add(final, instrumentName.charAt(p - 1));
            }

            if (occupiedShortNames.indexOf(final) === -1) {
                // not found in array so unique shortname
                shortInstrumentName = final;
                occupiedShortNames[t] = shortInstrumentName;
                break;
            }
        }
    } else {
        // at least 1 space in instrument name
        firstPart = instrumentName.slice(0, n);
        secondPart = instrumentName.slice(add(n, 1), instrumentName.length);
        part1 = firstPart.charAt(0);
        part2 = secondPart.charAt(0);

        occupiedShortNames = occupied(part1, part2, instrumentName, occupiedShortNames, shortInstrumentName, t)
        shortInstrumentName = short(part1, part2, instrumentName, occupiedShortNames, shortInstrumentName);
    }
    return (occupiedShortNames, shortInstrumentName)
}
module.exports = { getLilypondHeader, occupied, shortNames, short, increment, getEmptyList, instrument, getDrum, helperInstrument, combine, combine2, get_temparr, getNoteCount, getOctaveTotal, replace_instr, div, findClef, computeInstrument, computeCounter, getStringArr, getTupletDuration, getExtendedScale, findKeySignature, computeModeDef, getEmptyString, getArr, getModeDef, getScale, getSong, getObj, __toLilynote, toFraction, processLilypondNotes, saveLilypondOutput, __processTuplet, computeFoundNotes, funcNum, greaterThan, getRodents, getClefs, getNumberNames, retEmpty, add };