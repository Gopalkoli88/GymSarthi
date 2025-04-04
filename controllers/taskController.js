const Task = require("../models/Task");
const Plan = require("../models/Plan");

const createTaskForPlanMembers = async (req, res) => {
  try {
    const {
      planId,
      date,
      warmupExercises,
      mainExercises,
      cooldownExercises,
      preWorkoutAdvice,
      postWorkoutAdvice,
      dailyHydration,
      balancedDietAdvice,
    } = req.body;
    console.log("PlanId from taskController :", planId);

    const planData = await Plan.findById(planId).populate("users");
    console.log("Plan data :", planData);
    if (!planData) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    const memberStatuses = planData.users.map((user) => ({
      memberId: user._id,
      status: "pending",
    }));
    const task = new Task({
      assignedMembers: planData.users.map((user) => user._id),
      assignedTrainer: planData.trainer,
      planId,
      date,
      warmupExercises,
      mainExercises,
      cooldownExercises,
      preWorkoutAdvice,
      postWorkoutAdvice,
      dailyHydration,
      balancedDietAdvice,
      memberStatuses,
    });

    const saveTask = await task.save();

    res.status(201).json({
      success: true,
      message: "Tasks assigned to all members of the plan",
      taskId: saveTask.id,
      task,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// --------------------------------------------------------------------------------
const formatTaskResponseForMember = (tasks, memberId) => {
  return tasks.map((task) => {
    const {
      _id,
      assignedTrainer,
      planId,
      date,
      warmupExercises,
      mainExercises,
      cooldownExercises,
      preWorkoutAdvice,
      postWorkoutAdvice,
      dailyHydration,
      balancedDietAdvice,
      memberStatuses,
      createdAt,
      updatedAt,
    } = task;

    const memberStatus = memberStatuses.find(
      (status) => status.memberId.toString() === memberId.toString()
    );

    return {
      taskId: _id,
      trainerId: assignedTrainer,
      planId: planId,
      date: date,
      warmupExercises: warmupExercises,
      mainExercises: mainExercises,
      cooldownExercises: cooldownExercises,
      preWorkoutAdvice: preWorkoutAdvice,
      postWorkoutAdvice: postWorkoutAdvice,
      dailyHydration: dailyHydration,
      balancedDietAdvice: balancedDietAdvice,
      memberStatus: memberStatus ? memberStatus.status : "not assigned",
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
  });
};

const getTasksForMember = async (req, res) => {
  try {
    console.log("req user : ", req.user);
    const memberId = req.params.id;
    // const tasks = await Task.find({ assignedMembers: memberId }).populate(
    //   "assignedTrainer plan"
    // );

    console.log("Member Id : ", memberId);
    const tasks = await Task.find({ assignedMembers: memberId }).populate("planId");

    if (!tasks) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found for the member" });
    }

    const formattedTasks = formatTaskResponseForMember(tasks, memberId);

    res.status(200).json({ success: true, tasks: formattedTasks });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateTaskStatusForMember = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const memberId = req.user.id;
    console.log("frm taskController :", memberId);

    const task = await Task.findById(_id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    console.log("Task :", task);

    const memberStatus = task.memberStatuses.find(
      (ms) => ms.memberId.toString() === memberId.toString()
    );

    console.log("memberStatus ", memberStatus);
    if (!memberStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found in task" });
    }

    memberStatus.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated for member",
      task,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getTaskStatusForMember = async (req, res) => {
  try {
    const taskId = req.params;
    const memberId = req.user.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const memberStatus = task.memberStatuses.find(
      (ms) => ms.memberId.toString() === memberId
    );
    if (!memberStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found in task" });
    }

    res.status(200).json({
      success: true,
      memberStatus,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createTaskForPlanMembers,
  getTasksForMember,
  updateTaskStatusForMember,
  getTaskStatusForMember,
};
