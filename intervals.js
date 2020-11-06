const intervals = ['m2', 'M2', 'm3', 'M3', 'P4', '-', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];

function intervalConstruction(arr) {
    let rightSemitone = intervals.indexOf(arr[0]) + 1;
    let degrees  = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
    let semitones = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', '6 semitones', 'G', 'F#/Gb', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', '6 semitones', 'G', 'F#/Gb', 'A', 'A#/Bb', 'B', 'C'];

    if(arr.length === 2){
        arr.push('asc');
    }
    if(arr.length < 2 || arr.length > 3){
        return "Illegal number of elements in input array";
    } else {
        if(arr[2] === 'dsc'){
            degrees = degrees.reverse();
            semitones = semitones.reverse();
        }
                    
        let firstNote = arr[1].charAt(0);
        let quantity = parseInt(arr[0].charAt(1));
        let firstNum = degrees.findIndex(el => el === firstNote);
        let secondNum = firstNum + quantity - 1;
        let secondNote = degrees[secondNum]; 
        
        let firstSemitone = semitones.findIndex(el => el === firstNote);
        let secondSemitone = semitones.slice(firstSemitone, semitones.length).findIndex(el => el === secondNote) + firstSemitone;
        let receivedSemitone = secondSemitone - firstSemitone;
        
        if(arr[1].length == 2){
            let accidentalSemitone = arr[1].charAt(1);
            if(arr[2] === 'asc'){
                if(accidentalSemitone === '#'){
                    receivedSemitone--;
                } 
                if(accidentalSemitone === 'b'){
                    receivedSemitone++;
                }
            } else {
                if(accidentalSemitone === '#'){
                    receivedSemitone++;
                } 
                if(accidentalSemitone === 'b'){
                    receivedSemitone--;
                }
            }
        }

        let correcting = receivedSemitone - rightSemitone;
        if(arr[2] === 'dsc'){
            correcting = rightSemitone - receivedSemitone;
        }
        
        let finalNote;
        switch (correcting) {
            case -2:
                finalNote = secondNote + '##';
                break;
            case -1:
                finalNote = secondNote + '#';
                break;
            case 1:
                finalNote = secondNote + 'b';
                break;
            case 2:
                finalNote = secondNote + 'bb';
                break;
            default:
                finalNote = secondNote;
        }
        return finalNote;
    }
}

function intervalIdentification(arr) {
    let semitones = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', '6 semitones', 'G', 'F#/Gb', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', '6 semitones', 'G', 'F#/Gb', 'A', 'A#/Bb', 'B'];
    
    if(arr.length === 2){
        arr.push('asc');
    }
    if(arr.length < 2 || arr.length > 3){
        return "Cannot identify the interval";
    } else {
        if(arr[2] === 'dsc'){
            semitones = semitones.reverse();
        } 
        if (arr.length === 2 || arr.length === 3) {  
            let firstSemitone = semitones.indexOf(arr[0].charAt(0));
            let secondSemitone = semitones.indexOf(arr[1].charAt(0));
            if(secondSemitone < firstSemitone){
                secondSemitone = secondSemitone + semitones.length / 2;
            } 
            let receivedSemitone = secondSemitone - firstSemitone - 1;
            let accidentalSemitone;

            if(arr[0].length == 2){
                accidentalSemitone = arr[0].charAt(1);
                if(arr[2] === 'asc'){
                    (accidentalSemitone === '#') ? receivedSemitone-- : receivedSemitone++;
                } else {
                    (accidentalSemitone === '#') ? receivedSemitone++ : receivedSemitone--;
                }
            }
            if(arr[1].length == 2){
                accidentalSemitone = arr[1].charAt(1);
                if(arr[2] === 'asc'){
                    (accidentalSemitone === '#') ? receivedSemitone++ : receivedSemitone--;
                } else {
                    (accidentalSemitone === '#') ? receivedSemitone-- : receivedSemitone++;
                }
            }
            if(arr[0].length == 3){
                accidentalSemitone = arr[0].charAt(1);
                if(arr[2] === 'asc'){
                    (accidentalSemitone === '#') ? receivedSemitone -= 2 : receivedSemitone += 2;
                } else {
                    (accidentalSemitone === '#') ? receivedSemitone += 2 : receivedSemitone -= 2;
                }
            }
            if(arr[1].length == 3){
                accidentalSemitone = arr[1].charAt(1);
                if(arr[2] === 'asc'){
                    (accidentalSemitone === '#') ? receivedSemitone += 2 : receivedSemitone -= 2;
                } else {
                    (accidentalSemitone === '#') ? receivedSemitone -= 2 : receivedSemitone += 2;
                }
            }
            let intervalName = intervals[receivedSemitone];
            return intervalName; 
        } 
    }
}
