export const JOBS_EVENTS_UPDATE_ACTION = 'jobs/events/update';

const jobsContextReducer = (state, action) => {

    if (action.type === JOBS_EVENTS_UPDATE_ACTION) {

        let counters = {
            addedJobCount: state.addedJobCount ? state.addedJobCount : 0,
            takenJobCount: state.takenJobCount ? state.takenJobCount : 0,
            finishedAndPaidJobCount: state.finishedAndPaidJobCount ? state.finishedAndPaidJobCount : 0
        }

        for (let log of action.payload.logs) {

            switch (log.eventName) {

                case 'jobAdded':
                    counters.addedJobCount += 1;
                    break;

                case 'jobTaken':
                    counters.takenJobCount += 1;
                    break;

                case 'jobIsFinishedAndPaid':
                    counters.finishedAndPaidJobCount += 1;
                    break;
            }
        }

        return {
            ...state,

            addedJobCount: state.addedJobCount,
            takenJobCount: state.takenJobCount,
            finishedAndPaidJobCount: state.finishedAndPaidJobCount
        };
    }

    return state;
};

export default jobsContextReducer;