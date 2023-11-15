import { ethers } from "ethers";

export const JOBS_EVENTS_UPDATE_ACTION = 'jobs/events/update';

const jobsContextReducer = (state, action) => {

    const logs = action.payload.logs;

    if (action.type === JOBS_EVENTS_UPDATE_ACTION && logs.length > 0) {

        for (let log of logs) {

            switch (log.eventName) {

                case 'jobAdded':

                    let addedJobId = Number(log.args.id);

                    if (!state.jobs.some(job => job.id == addedJobId)) {

                        let addedJobPrice = ethers.formatEther(log.args.price);

                        state.jobs.push({
                            id: addedJobId,
                            author: log.args.author,
                            description: log.args.description,
                            price: addedJobPrice,
                            isFinished: log.args.isFinished
                        });
                    }

                    break;

                case 'jobTaken':

                    let takenJobId = Number(log.args.id);

                    let takenJob = state.jobs.find(job => job.id === takenJobId);

                    if (takenJob) {

                        takenJob.worker = log.args.worker;
                    }

                    break;

                case 'jobIsFinishedAndPaid':

                    let finishedAndPaidJobId = Number(log.args.id);

                    let finishedAndPaidJob = state.jobs.find(job => job.id === finishedAndPaidJobId);

                    if (finishedAndPaidJob) {

                        takenJob.isFinishedAndPaid = true;
                    }

                    break;
            }
        }

        return {

            ...state,

        };
    }

    return state;
};

export default jobsContextReducer;