export default {
  async contactCoach(context, payload) {
    const newReq = {
      // coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(
      `https://coach-75e3d-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newReq)
      }
    );

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.meesage || 'Failed to send a request !!!'
      );
      throw error;
    }
    newReq.id = responseData.name;
    newReq.coachId = payload.coachId;
    context.commit('addRequest', newReq);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coach-75e3d-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.meesage || 'Failed to fetch a request !!!'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const req = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(req);
    }

    context.commit('setRequests', requests);
  }
};
