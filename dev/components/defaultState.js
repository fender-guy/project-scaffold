import FAD from 'flux-a-duck';
import Immutable from 'immutable';

export default () => {
    FAD.action((store, data) => {
        store.replace(Immutable.fromJS(
            {
                rightMenu      : [
                    {
                        type : 'tools'
                    },
                    {
                        type : 'elements'
                    }
                ],
                leftMenu       : [],
                canvasElements : []
            }
        ));
    });
}
