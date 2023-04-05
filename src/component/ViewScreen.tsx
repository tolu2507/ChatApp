/* eslint-disable prettier/prettier */
// import React from 'react';

export type MESSAGE = {
  id: React.Key | null | undefined;
  user: {
    displayName:
      | string
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  };
  text:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

// const ViewScreen = ({text}: MESSAGE) => {
//   return (
//     <View
//       style={{
//         backgroundColor: '#008000',
//         maxWidth: 300,
//         padding: 10,
//         display: 'flex',
//         flexWrap: 'wrap',
//         flexDirection: 'row',
//         // justifyContent: 'center',
//         marginBottom: 5,
//         borderRadius: 10,
//       }}>
//       <Text style={{fontSize: 17}}>{text}</Text>
//     </View>
//   );
// };

// export default React.memo(ViewScreen);
