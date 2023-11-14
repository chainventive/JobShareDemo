export const JOBS_EVENTS_UPDATE_ACTION = 'jobs/events/update';

const jobsContextReducer = (state, action) => {

    const logs = action.payload.logs;

    if (action.type === JOBS_EVENTS_UPDATE_ACTION && logs.length > 0) {

        let counters = {
            addedJobCount: state.addedJobCount ? state.addedJobCount : 0,
            takenJobCount: state.takenJobCount ? state.takenJobCount : 0,
            finishedAndPaidJobCount: state.finishedAndPaidJobCount ? state.finishedAndPaidJobCount : 0
        }

        let uniqueJobs = new Set(state.jobs);

        for (let log of logs) {

            switch (log.eventName) {

                case 'jobAdded':
                    counters.addedJobCount += 1;
                    uniqueJobs.add({
                        id: log.args.id,
                        author: log.args.author,
                        description: log.args.description,
                        price: log.args.price,
                        isFinished: log.args.isFinished
                    })
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

            addedJobCount: counters.addedJobCount,
            takenJobCount: counters.takenJobCount,
            finishedAndPaidJobCount: counters.finishedAndPaidJobCount,
            jobs: Array.from(uniqueJobs),
        };
    }

    return state;
};

export default jobsContextReducer;