if (Meteor.isClient) {


    ps = [true, true, true, true, false, false, false, false];
    qs = [true, true, false, false, true, true, false, false];
    rs = [true, false, true, false, true, false, true, false];
    equation = [];

  Template.logExp.helpers({
      expression: function () {
          return Session.get('logExp');
      },

      display: function () {
          if (Session.get('logExp')) return true;
      }

  });

    Template.logResult.helpers({
        p: function () {
            var displays = new Array;
            for(var i = 0; i < ps.length; i++) {
                if (ps[i] == true){
                    displays[i] = 'T';
                }
                else {
                    displays[i] = 'F';
                }
            }

            return displays;
        },
        q: function () {
            var displays = new Array;
            for(var i = 0; i < qs.length; i++) {
                if (qs[i] == true){
                    displays[i] = 'T';
                }
                else {
                    displays[i] = 'F';
                }
            }

            return displays;
        },
        r: function () {
            var displays = new Array;
            for(var i = 0; i < rs.length; i++) {
                if (rs[i] == true){
                    displays[i] = 'T';
                }
                else {
                    displays[i] = 'F';
                }
            }

            return displays;
        },
        result: function () {

            res = Session.get('results');
            var displays = new Array;
            for(var i = 0; i < rs.length; i++) {
                if (res[i] == true){
                    displays[i] = 'T';
                }
                else {
                    displays[i] = 'F';
                }
            }

            return displays;
        }

    });

    Template.sets.events({
       'submit form': function (event) {
           event.preventDefault();
           inSetA = event.target.setA.value;
           inSetB = event.target.setB.value;

           setA = inSetA.split(',');
           setB = inSetB.split(',');
           setU = setA.concat(setB);
           for (var i = 0; i < setU.length; i++) {
               for (var j = 0; j < setU.length; j++) {
                   if (i !== j) {
                       if (setU[i] === setU[j]) {
                           setU.splice(j, 1);
                       }
                   }
               }

           }
            Session.set('setReady', true);
           console.log(setU);
           setV = [];
           for(var i = 0; i < setA.length; i++) {
               for(var j = 0; i < setB.length; j++){

               }
           }
       }

    });

    Template.sets.helpers({

        ready: function () {
          return Session.get('setReady');
        },

        union: function () {
            if(setU) {
                console.log(setU);
                for(var i = 0; i < setU.length; i++) {
                    setUnion = setU[i] + " ";
                }
                return setUnion;
            }
        }

    });

  Template.logExp.events({
    'submit form': function (event) {
        event.preventDefault();
        exp = event.target.expression.value;
        Session.set('logExp', exp);
        expression = exp.split(' ');
        console.log(expression);

        for (var i = 0; i < expression.length; i++) {
            switch (expression[i]) {
                case 'OR':
                    before = expression[i-1] + 's';
                    after = expression[i+1] + 's';

                    for (var j = 0; j < 8; j++) {
                        equation[j] = eval(before)[j] || eval(after)[j];
                    }
                    console.log(equation);
                    Session.set('results', equation);
                    break;
                case 'AND':
                    before = expression[i-1] + 's';
                    after = expression[i+1] + 's';

                    for (var j = 0; j < 8; j++) {
                        equation[j] = eval(before)[j] && eval(after)[j];
                    }
                    console.log(equation);
                    Session.set('results', equation);
                    break;
                case 'XOR':

                case '!':
                    after = expression[i+1] + 's';

                    for (var j = 0; j < 8; j++) {
                        equation[j] = !eval(after)[j];
                    }
                    console.log(equation);
                    Session.set('results', equation);
                    break;
                case '->':

                case '<->':
            }
        }
    }


  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
